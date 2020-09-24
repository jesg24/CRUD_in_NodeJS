const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'inventory'
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
});

//route for home page
app.get('/',(req, res) => {
  res.send('Welcome To Express');
});

// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
