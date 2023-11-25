const mysql = require('mysql');
const express = require('express');
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});

//create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS ashu589';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

//create table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS IWCNNote(id int AUTO_INCREMENT, Title VARCHAR(255), Description VARCHAR(255), Date DATE, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('table created...');
    });
});

// Get all posts
app.get('/getall', (req, res) => {
    let sql = 'SELECT * FROM IWCNNote';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result); 
    });
});


// Delete post
app.delete('/delete/:id', (req, res) => {
    let sql = `DELETE FROM IWCNNote WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});

// Insert post 
app.post('/insert', (req, res) => {
    const date = new Date().toISOString().slice(0, 10);
    console.log(req);
    let form = req.body;
    let sql = `INSERT INTO IWCNNote(Title, Description, Date) VALUES ('${form.title}', '${form.description}', '${date}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post added...');
    });
});