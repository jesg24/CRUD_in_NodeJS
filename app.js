const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

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

//set views file
app.set('views',path.join(__dirname,'views'));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//SELECT ITEMS
app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM items";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('items_index', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            items : rows
        });
    });
});

//ADD ITEMS
app.get('/add',(req, res) => {
    res.render('items_add', {
        title : 'CRUD Operation using NodeJS / ExpressJS / MySQL'
    });
});
app.post('/save',(req, res) => {
    let data = {name: req.body.name, qty: req.body.qty, amount: req.body.amount};
    let sql = "INSERT INTO items SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

//UPDATE ITEMS
app.get('/update/:itemsID',(req, res) => {
    const itemsID = req.params.itemsID;
    let sql = `SELECT * FROM items WHERE id = ${itemsID}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('items_edit', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            items : result[0]
        });
    });
});
app.post('/update',(req, res) => {
    const itemsID = req.body.id;
    let sql = "UPDATE items SET name='"+req.body.name+"',  qty='"+req.body.qty+"',  amount='"+req.body.amount+"' WHERE id ="+itemsID;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

//DELETE ITEMS
app.get('/delete/:itemsID',(req, res) => {
    const itemsID = req.params.itemsID;
    let sql = `DELETE FROM items WHERE id = ${itemsID}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});

// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
