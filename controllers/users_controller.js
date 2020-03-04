module.exports.profile=function(req,res){
    // res.end('<h1>User Profile</h1>');        send direct message to the server
    return res.render('users_profile',{       // Render views/users_profile file to the server
        title: "profile"
    });
}