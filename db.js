const mongoose = require('mongoose');

//connecting to database
async function dbconnection(){
    await mongoose.connect(process.env.db_url,(err)=>{
        if(err){
            console.log('not connected to amazon db')
        }else{
            console.log('connected to amazon db')
        }
    })
}

module.exports = {
    dbconnection
}