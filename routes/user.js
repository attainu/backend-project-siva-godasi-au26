const router = require('express').Router();
const{userModel} = require('../models/user.js');
console.log(userModel)
const {authUser} = require('../middleware/autharizaton')

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
        res.status(201).send('new user added successfully')
    }catch(err){
        req.flash('errors','email is already present choose another email');
        res.redirect('/signup')
    }
})

router.post('/login',async(req,res)=>{
    const{email} = req.body
    try{
        const userdata =await userModel.findOne({email:email})
        console.log (userdata.email)
        if(userdata.email ==email){
            req.session.emailID = email
            // console.log(req.session.email)
            req.session.isLogged = true
            
        }
        // console.log(userdata)
        res.send('gjbgjgjg')
    
    }catch(err){
        req.flash('message','you are not a member please signup');
        res.redirect('/login')
    }  
})

module.exports = router;