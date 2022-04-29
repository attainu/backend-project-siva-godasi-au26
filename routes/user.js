const router = require('express').Router();
const bcrypt = require('bcrypt');
const{userModel} = require('../models/user.js');
console.log(userModel)
const {authUser} = require('../middleware/autharizaton');
const session = require('express-session');
const multer = require('multer');
const {Base64} = require('js-base64');
const upload = multer({ storage: multer.memoryStorage() })
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'sivagodasi', 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
  });

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
    // console.log(email)
    // console.log(password)
    try{
        const userdata =await userModel.findOne({email:email})
        // console.log (userdata.email)
        // console.log(userdata.password)
        const passwordmatch = await bcrypt.compare(password,userdata.password)
        // console.log(passwordmatch)
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
    // console.log(profile.phonenumber)
    // console.log(profile)
    // console.log(req.session.emailID)
    res.render('accounts/profile',{profile:profile})
    
})
// logout user
router.get('/logout',authUser,async(req,res)=>{
    req.session.destroy()
    console.log('you are logged out')
})

router.get('/editprofile',authUser,async(req,res)=>{
    const editprofile = await userModel.findOne({email:req.session.emailID})
    // console.log(editprofile.email)
    res.render('accounts/editprofile',{editprofile:editprofile})
})

router.post('/editprofile',upload.single('picture'),authUser,async(req,res)=>{
   try{
        if(req.session.emailID){
            userModel.findOne({email:req.session.emailID},async(err,user)=>{
                const file = req.file
                if(file){
                    const encodeddata = Base64.encode(file.buffer)
                    await cloudinary.uploader.upload(`data:${file.mimetype};base64,${encodeddata}`,function(error,result){
                        user.profile.picture = result.secure_url
                        console.log(user) 
                    })
                }
                if (user!=null){
                    user.profile.name = req.body.name;
                    req.body.email = req.body.email.toLowerCase();
                    user.email = req.body.email;
                    user.address = req.body.address;
                    user.phonenumber = req.body.phonenumber;
                    user.save(function(err,user){
                        console.log(user)
                        req.session.email = req.body.email
                        res.redirect('/profile')
                    })
                }else{
                    res.send('email id should be unique')
                }
            })
        }
        
        // const filedata = req.file
        // const encodeddata = Base64.encode(filedata.buffer)
        // if(filedata){
        //     await cloudinary.uploader.upload(`data:${filedata.mimetype};base64,${encodeddata}`,function(error,result){
        //         console.log(result)
        //         editdata.picture = result.secure_url             
        //         // console.log(studentdata)
        //     }); 
        // }
       

        // })
        // res.redirect('/profile')
   }catch(err){
        console.log(err)
   } 
})

module.exports = router;