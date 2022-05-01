var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'category'
    },
  name:{
    type:String,
    unique:true
  },
  price: Number,
  image: String
})

const productModel= mongoose.model('product', productSchema);
module.exports = {
    productModel
}