module.exports.home=function(req,res){

    // return res.end('<h1>Express is up for codeial</h1>');   serve directly to the browser
    
    // Request by browser for cookie 
    console.log(req.cookies);
    
    // Change cookie id given by browser
    res.cookie('user_id',11);

    return res.render('home',{
        title: "Home"
    });
}

