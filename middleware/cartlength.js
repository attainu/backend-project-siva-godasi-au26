// const {userModel} = require('../models/user');
// const { authUser } = require('./autharizaton');
// const {cartModel} = require('../models/cart');



// const cartlength = async(req,res,next)=>{
//     if(req.session.emailID){
//         let total = 0;
//         const user = await userModel.findOne({email:req.session.emailID})
//         // console.log(req.session.emailID)
//         // console.log(user)
//         const cart = await cartModel.findOne({owner:user._id})
//         console.log(cart)
//         if(cart!=undefined){
//             for(var i=0;i<cart.items.length;i++){
//                 total += cart.items[i].quantity
//             }
//         }
//         return total
//     }else{
//         next()
//     }
// }

// module.exports = {
//     cartlength
// }