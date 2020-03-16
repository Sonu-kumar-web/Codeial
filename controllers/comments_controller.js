const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');

// To Create the comment 
// module.exports.create=function(req, res){
//     Post.findById(req.body.post,function(err, post){
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             },function(err, comment){
//                 if(err){
//                     console.log('Error in post the comment');
//                     return;
//                 }
//                 post.comments.push(comment);
//                 post.save();
//                 res.redirect('/');
//             });
//         }
//     });
// }

// To Create the comment by Async Await
module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();

            // send mail to user by nodemail
            comment = await comment.populate('user','name email').execPopulate();
            commentsMailer.newComment(comment);

            if(req.xhr){
                // Similar for comment to fetch the user's id!
                // comment = await comment.populate('user','name').execPopulate();
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created"
                });
            }
            req.flash('success', 'Comment Published!');
            res.redirect('/');
        }
    }catch(err){
        console.log('Error', err);
        req.flash('error',err);
        return;
    }
    
}


// To Delete the comments
// module.exports.destroy=function(req, res){
//     Comment.findById(req.params.id, function(err, comment){
//         if(comment.user == req.user.id){
//             let postId=comment.post;
//             comment.remove();
//             Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }


// To Delete the comments by Async Await
module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // send the comment id which was deleted back to the view
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            req.flash('success','Comment deleted!');
            return res.redirect('back');
        }else{
            req.flash('error','Unauthorized')
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        req.flash('error',err);
        return;
    }
    
}