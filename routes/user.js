const router = require('express').Router();
const bcrypt = require('bcrypt');
const{userModel} = require('../models/user.js');
console.log(userModel)
const {authUser} = require('../middleware/autharizaton');
const session = require('express-session');

router.get('/signup',(req,res)=>{
    res.render('accounts/signup',{errors:req.flash('errors')})
})

router.get('/login',(req,res)=>{
    res.render('accounts/login',{message:req.flash('message')})
})

router.post('/signup',async(req,res)=>{
    const user = new userModel()
    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    // console.log(user)
    try{
        const adduserdata = await userModel.create(user);
        res.redirect('/login')
    }catch(err){
        req.flash('errors','email is already present choose another email');
        res.redirect('/signup')
    }
})

router.post('/login',async(req,res)=>{
    const{email,password} = req.body
    try{
        const userdata =await userModel.findOne({email:email})
        console.log (userdata.email)
        console.log(userdata.password)
        const passwordmatch = await bcrypt.compare(password,userdata.password)
        console.log(passwordmatch)
        if(userdata.email ==email && passwordmatch == true ){
            req.session.emailID = email
            // console.log(req.session.email)
            req.session.isLogged = true
            res.redirect('/profile')
        }else{
           req.flash('message','password and email not matches')
           res.redirect('/login')
        }
    }catch(err){
        req.flash('message','you are not a member please signup');
        res.redirect('/login')
    }  
})

router.get('/',(req,res)=>{
    res.render('accounts/home')
})

router.get('/profile',authUser,async(req,res)=>{
    const profile = await userModel.findOne({email:req.session.emailID})
    // console.log(profile)
    // console.log(req.session.emailID)
    res.render('accounts/profile',{profile:profile})
    
})

router.get('/logout',authUser,async(req,res)=>{
    req.session.destroy()
    console.log('you are logged out')
})
module.exports = router;