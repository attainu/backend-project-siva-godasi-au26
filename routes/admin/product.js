const router = require('express').Router();
const {productModel} = require("../../models/product");
console.log(productModel);
const multer = require('multer');
const {Base64} = require('js-base64');
const { route } = require('../user');
const{userModel} = require('../../models/user')
const {cartModel} = require('../../models/cart')
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

//find all the cars renderpage
router.get('/cars',async(req,res)=>{
    try{
        const user= await userModel.findOne({email:req.session.emailID})
        let total=0
        if(req.session.emailID){
            const user = await userModel.findOne({email:req.session.emailID})
            console.log(req.session.emailID)
            console.log(user)
            const cart = await cartModel.findOne({owner:user._id})
            console.log(cart)
            if(cart){
                for(var i=0;i<cart.items.length;i++){
                    total += cart.items[i].quantity
                }
            }
        }
        const cars = await productModel.find({category:'626bec384041753792857287'})
        // console.log(cars)
        res.render('accounts/cars',{cars:cars,user:user,total:total})
    }catch(err){
        console.log(err)
    }
})

//find all the bikes
router.get('/bikes',async(req,res)=>{
    try{
        const user= await userModel.findOne({email:req.session.emailID})
        let total=0
        if(req.session.emailID){
            const user = await userModel.findOne({email:req.session.emailID})
            console.log(req.session.emailID)
            console.log(user)
            const cart = await cartModel.findOne({owner:user._id})
            console.log(cart)
            if(cart){
                for(var i=0;i<cart.items.length;i++){
                    total += cart.items[i].quantity
                }
            }
        }
        const bikes = await productModel.find({category:'626becaa80ba5cb40c04dbbb'})
        res.render('accounts/bikes',{bikes:bikes,user:user,total:total})
    }catch(err){
        console.log(err)
    }
})

router.get('/bikes/:id',async(req,res)=>{
    try{
        let total=0
        if(req.session.emailID){
            const user = await userModel.findOne({email:req.session.emailID})
            console.log(req.session.emailID)
            console.log(user)
            const cart = await cartModel.findOne({owner:user._id})
            console.log(cart)
            if(cart){
                for(var i=0;i<cart.items.length;i++){
                    total += cart.items[i].quantity
                }
            }
        }
        const user = await userModel.findOne({email:req.session.emailID})
        // console.log(user)
        const{id} = req.params
        const bike = await productModel.findById(id)
        res.render('accounts/bike',{bike:bike,user:user,total:total})
    }catch(err){
        console.log(err)
    }
})

router.get('/cars/:id',async(req,res)=>{
    try{
        let total=0
        if(req.session.emailID){
            const user = await userModel.findOne({email:req.session.emailID})
            console.log(req.session.emailID)
            console.log(user)
            const cart = await cartModel.findOne({owner:user._id})
            console.log(cart)
            if(cart){
                for(var i=0;i<cart.items.length;i++){
                    total += cart.items[i].quantity
                }
            }
        }
        console.log(req.session.emailID)
        const user = await userModel.findOne({email:req.session.emailID})
        // console.log(user)
        const{id} = req.params
        if(user){
            console.log(user.email)
        }else{
            console.log('user not found')
        }
        const car = await productModel.findById(id)
        res.render('accounts/car',{car:car,user:user,total:total})
    }catch(err){
        console.log(err)
    }
})

router.post('/addtocart',async(req,res)=>{
    try{
        const user = await userModel.findOne({email:req.session.emailID})
        // console.log(user)
        const cart = await cartModel.findOne({owner:user._id})
        cart.items.push({
            item:req.body.product_id,
            price:parseFloat(req.body.priceValue),
            quantity:parseInt(req.body.quantity)
        })
        cart.total = (cart.total+parseFloat(req.body.priceValue)).toFixed(2);
        // console.log(cart)
        const addedtocart = await cartModel.create(cart)
        res.redirect('/profile')
    }catch(err){
        console.log(err)
    }
})

router.get('/cart',async(req,res)=>{
    try{
        const user=await userModel.findOne({email:req.session.emailID})
        const cart = await cartModel.findOne({owner:user._id}).populate('items.item')
        let total=0
        // console.log(cart)
        if(cart){
            for(var i=0;i<cart.items.length;i++){
                total += cart.items[i].quantity
            }
        }
        res.render('accounts/cart',{cart:cart,user:user,total:total})
    }catch(err){
        console.log(err)
    }
})

router.post('/remove',async(req,res)=>{
    try{
        const user = await userModel.findOne({email:req.session.emailID})
        // console.log(user)
        const cart = await cartModel.findOne({owner:user._id})
        cart.items.pull(String(req.body.item))
        cart.total = (cart.total - parseFloat(req.body.price)).toFixed(2);
        // console.log(cart)
        cart.save(function(err){
            console.log(err)
            res.redirect('/cart')
        })
       
    }catch(err){
        console.log(err)
    }
})

module.exports = router;

