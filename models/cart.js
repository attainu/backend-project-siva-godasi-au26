const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    owner: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    total:{
        type:Number,
        default:0
    },
    items:[{
        item:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'product'
        },
        quantity:{
            type:Number,
            dafault:1
        },
        price:{
            type:Number,
            dafault:0
        }
    }]
})

const cartModel = mongoose.model('cart',cartSchema);

module.exports={
    cartModel
}