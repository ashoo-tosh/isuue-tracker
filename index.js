const express = require('express');
const mongoose  = require('mongoose');
const path = require('path');
const cors = require('cors');
const expressEjsLayouts = require('express-ejs-layouts');

//connecting dotenv
require('dotenv').config();

//assigning port
const port = process.env.port || 8000;

//express app
const app = express();

// using cors for accessing cross origin browsers datas
app.use(cors());

//url encoder steup
app.use(express.urlencoded());

app.use('/', expressEjsLayouts);

app.use(express.static('assets'));


//view engin setup
app.set('view engine', 'ejs');
app.set('views', './views');

//accesing routes
app.use('/', require('./routers'));

// meathod to start server
const startServer = async () => {
    try {
        // connecting with db
        await mongoose.connect(process.env.mongoDbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('sucessfully connected with db');

        //starting server 
        app.listen(port, (err) => {
            if(err){
                throw new Error(err);
            }
            console.log(`${process.env.environment} server start at port ${port}`);
        })
    } catch (err) {
        console.log('error in starting server', err);
    }
}
startServer();