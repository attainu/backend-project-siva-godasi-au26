
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const ejs = require('ejs');
const engine = require('ejs-mate');
const flash = require('express-flash');
const session = require('express-session');
// mongoconnect library is used to store our session in mongodatabase
const MongoStore = require('connect-mongo');
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({mongoUrl:process.env.db_url}),

    cookie: { maxAge: 1000*60*20},
    // name:session.id,
  }))
//morgan library used to identify what route user is requesting 
//and time taken to acess we can see in terminal.
app.use(morgan('dev'));
app.engine('ejs', engine);
app.set('view engine','ejs');
app.use(flash());
//cors is used to run our api in all origins.
app.use(cors());
//express.json() is used to accept json data
app.use(express.json());
//urlencoded is used to accept form data
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
//import database connection from db.js and connected
const {dbconnection} = require('./db.js');
dbconnection();


//import user related router
const userrouter = require('./routes/user')


app.use('/',userrouter)

app.listen(3000,()=>{
    console.log('sever is start running')
});