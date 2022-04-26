const mongoose = require('mongoose');

//connecting to database
async function dbconnection(){
    await mongoose.connect(process.env.db_url,(err)=>{
        if(err){
            console.log('not connected to db')
        }else{
            console.log('connected to db')
        }
    })
}

module.exports = {
    dbconnection
}