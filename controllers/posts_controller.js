const Post=require('../models/post');
const Comment=require('../models/comment');

// Create a post
// module.exports.create=function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){
//             console.log('Error in creating a post');
//             return;
//         }
//         return res.redirect('back');
//     });
// }

// Create a post by Async Await
module.exports.create= async function(req, res){
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch (err) {
        console.log('Error',err);
        return;
    }
}

// To delete the post 
// module.exports.destroy=function(req, res){
//     Post.findById(req.params.id,function(err, post){
//         // .id means converting objet id into String
//         if(post.user==req.user.id){
//             post.remove();
//             Comment.deleteMany({post: req.params.id},function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }

// To delete a post by Async await
module.exports.destroy= async function(req, res){
    try {
        let post=await Post.findById(req.params.id);
            // .id means converting objet id into String
            if(post.user==req.user.id){
                post.remove();
                await Comment.deleteMany({post: req.params.id});
                return res.redirect('back');
            }else{
                return res.redirect('back');
            }
    } catch (error) {
        console.log('Error',err);
            return;
    }
}
