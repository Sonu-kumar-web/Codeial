const Post=require('../models/post');
module.exports.home=function(req,res){

    // return res.end('<h1>Express is up for codeial</h1>');   serve directly to the browser
    
    // Request by browser for cookie 
        // console.log(req.cookies);
    
    // Change cookie id given by browser
        // res.cookie('user_id',11);

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // Populate the user of each post
    Post.find({}).populate('user').exec(function(err,posts){
            return res.render('home',{
                title: "Codeial | Home",
                posts: posts
            });
        });
}

