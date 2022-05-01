const router = require('express').Router();
const {categoryModel} = require('../../models/category')
console.log(categoryModel)

router.get('/addcategory',(req,res)=>{
    res.render('admin/category',{message:req.flash('success')})
})

router.post('/addcategory',async(req,res)=>{
    const category = req.body
    console.log(category)
    try{
        const addcategory = await categoryModel.create(category)
        console.log(addcategory)
        req.flash('success','successfully added category')
        res.redirect('/addcategory')
    }catch(err){
        console.log(err)
    }
})

// router.get('/category',async(req,res)=>{
//     try{
//         const allcategories = await categoryModel.find({})
//         res.send(allcategories)
//     }catch(err){
//         console.log(err)
//     }
// })
module.exports = router;