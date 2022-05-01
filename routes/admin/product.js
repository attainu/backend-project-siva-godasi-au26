const router = require('express').Router();
const {productModel} = require("../../models/product");
console.log(productModel);
const multer = require('multer');
const {Base64} = require('js-base64');
const { route } = require('../user');
const{userModel} = require('../../models/user')
const {authUser} = require('../../middleware/autharizaton');
const upload = multer({ storage: multer.memoryStorage() })
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'sivagodasi', 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
  });

router.get('/addproduct',(req,res)=>{
    res.render('admin/product',{message:req.flash('success')})
})

router.post('/addproduct',upload.single('image'),async(req,res)=>{
    try{
        const product = req.body
        console.log(product)
        const file = req.file
        if(file){
            const encodeddata = Base64.encode(file.buffer)
            await cloudinary.uploader.upload(`data:${file.mimetype};base64,${encodeddata}`,function(error,result){
                product.image = result.secure_url
            })
            const addproduct = await productModel.create(product)
            req.flash('success',"product added successfully")
            res.redirect('/addproduct')
        }
    }catch(err){
        req.flash('success',"product is not added")
    }
})

// router.get('/product/:id',async(req,res)=>{
//     const{id} = req.params
//     try{
//         const product = await productModel.findById().populate('category')
//         res.send(product)
//     }catch(err){
//         console.log(err)
//     }
// })

//find all the cars renderpage
router.get('/cars',async(req,res)=>{
    try{
        const cars = await productModel.find({category:'626bec384041753792857287'})
        // console.log(cars)
        res.render('accounts/cars',{cars:cars})
    }catch(err){
        console.log(err)
    }
})

//find all the bikes
router.get('/bikes',async(req,res)=>{
    try{
        const bikes = await productModel.find({category:'626becaa80ba5cb40c04dbbb'})
        res.render('accounts/bikes',{bikes:bikes})
    }catch(err){
        console.log(err)
    }
})

router.get('/bikes/:id',async(req,res)=>{
    try{
        const user = userModel.findOne({email:req.session.emailID})
        const{id} = req.params
        const bike = await productModel.findById(id)
        res.render('accounts/bike',{bike:bike,user:user})
    }catch(err){
        console.log(err)
    }
})

router.get('/cars/:id',async(req,res)=>{
    try{
        const user = userModel.find({email:req.session.emailID})
        const{id} = req.params
        if(user){
            console.log(user)
        }else{
            console.log('user not found')
        }
        const car = await productModel.findById(id)
        res.render('accounts/car',{car:car,user:user})
    }catch(err){
        console.log(err)
    }
})
module.exports = router;

