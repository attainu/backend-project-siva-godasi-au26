const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//creating user schema 
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        lowercase:true
    },
    password:String,
    profile:{
        name:{
            type:String,
            default:'' //if user not give any name by default it takes an empty string
        },
        picture:{
            type:String,
            default:''
        }
    },
    address:String,
    histoty:[{ 
        date:Date,
        paid:{
            type:Number,
            default:0
        },
        // item:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:''
        // }
    }]
})

//by using bcrypt to hash the password before saving into datase
userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(12, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
})

//compare the user type password with database password
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

const userModel = mongoose.model('user',userSchema);
module.exports = {
    userModel
}