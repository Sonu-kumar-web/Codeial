const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');
router.get('/profile', usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);          // sign-in in if account is present

router.post('/create',usersController.create);          // create now account 
router.post('/create-session',usersController.createSession);       // Create session when user sign-in

module.exports=router;