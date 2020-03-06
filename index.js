const express = require('express');
const app = express();
const port = 8000;
const db=require('./config/mongoose');
const cookieParser=require('cookie-parser');

// for encode POST request
app.use(express.urlencoded());

// use cookie as middleware
app.use(cookieParser());

// include layouts library
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);

// Extract our style and script tag from sub-pages and put it into head of layout page
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Give access or set path for static files
app.use(express.static('./assets'));

// Use express router
app.use('/',require('./routes'));

// Set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running tha server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});