
const bcrypt = require("bcrypt")
const express = require('express') 
const cors = require('cors')
const app = express()
const port = 3000
const userController = require('./usercontrols.js');
const createError= require('http-errors')
app.use(express.json())
app.use(cors())
require('dotenv').config();
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// yhteys mongoDB
const mongoose = require('mongoose')
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
const ObjectId = mongoose.Types.ObjectId; //testaus
// virheen käsittelyt
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log("Connection to database established")
})

// loggeri tarkasteluun
const logger =(request, response, next) => {
    const date= new Date()
    const ldate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    const log = `${ldate} : ${request.method} ${request.url} \n reguestbody: ${request.body}`
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    console.log(today);
    const content = log
    console.log(content)
    next()
}   

// otetaan logger käyttöön, suorittaa siis jokaisen tulevan requestin yhteydessä
app.use(logger)


 // haetaan käyttäjä schema
const bookRoutes = require('./routes/BookRoutes.js'); // haetaan käyttöön book routet routes filusta
const userRoutes = require('./routes/UserRoutes.js');
app.use('/books', bookRoutes) //käytettään book routeja 
app.use('/users', userRoutes)


app.listen(port, () => {
  console.log('Example app listening on port 3000')
})