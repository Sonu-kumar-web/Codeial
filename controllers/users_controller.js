// import the model
const User=require('../models/user');

// Render the profile page
module.exports.profile=function(req,res){
    // res.end('<h1>User Profile</h1>');        send direct message to the server
    return res.render('user_profile',{       // Render views/users_profile file to the server
        title: "profile"
    });
}

// Render the Sign-up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        title: "codeial | sign up"
    });
}

// Render the sign-in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title: "codeial | sign in"
    });
}

// get the sign-up data
module.exports.create=function(req,res){
    // check password and conform password
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    // check whether email is present or not
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in signing up');
            return;
        }

        // create now account for new user if email is not present
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');  // return back if email is present 
        }
    });
}

// Sign in and create a session for user
module.exports.createSession=function(req,res){
    return res.redirect('/');
}