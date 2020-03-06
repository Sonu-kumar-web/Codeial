// import the model
const User=require('../models/user');

// Render the profile page
module.exports.profile=function(req,res){
    // res.end('<h1>User Profile</h1>');        send direct message to the server
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(user){
                return res.render('users_profile',{
                    title: "User Profile",
                    user: user
                });
                
            }else{
                return res.redirect('/users/sign-in');
            }
        });
    }else{
        return res.redirect('/users/sign-in');
    }
}

// Render the Sign-up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title: "codeial | sign up"
    });
}

// Render the sign-in page
module.exports.signIn=function(req,res){
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
    // Steps to Authenticate
        // Find the user
        User.findOne({email: req.body.email},function(err,user){
            if(err){
                console.log('Error in finding user in signing in');
                return;
            }
            // Handle user found
            if(user){
                // Handle password which doesn't match 
                if(user.password != req.body.password){
                    return res.redirect('back');
                }
                // Handle session creation
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');
            }else{
                // Handle user not found
                return res.redirect('back');
            }
        });
}