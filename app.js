const http = require("http");
const mysql = require('mysql');
const express = require('express');
//var connection = require('./db_connection.js'); 
var app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Bhoomil'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log("Connected successfully with the database:))))");
    else
        console.log("Cannot connect to the database:((( " + JSON.stringify(err, undefined, 2));

});

//get all students 
app.get('/liststudent', (req, res) => {
    mysqlConnection.query('SELECT * FROM studentmngsys', (err, rows) => {
        if (!err)
            res.send(rows); else
            console.log(err);
    })
});
//Get student with particular id 
app.get('/student/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM studentmngsys WHERE ID = ?',
        [req.params.id], (err, rows) => {
            if (!err)
                res.send(rows); else
                console.log(err);
        })
});
//Delete student with particular id 
app.delete('/student/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM studentmngsys WHERE ID = ?', 
        [req.params.id], (err, rows) => {
            //mysqlConnection.release() //return the connection to 
            if (!err)
             res.send('Deleted successfully.'); 
            else
             console.log(err);
        })
    });

//Insert new student 
app.post('/students', (req, res) => {

const sql = req.body;

    mysqlConnection.query('INSERT INTO studentmngsys SET ?', sql , (err, rows) => {
        
        if (!err){
            res.send(`studentmngsys with the name: ${sql.name} has been added.`)
        }
            
        else
            console.log(err);
        })
    });

//Update student information 
app.put('/student', (req, res) => {

const {id, name, address} = req.body;

    mysqlConnection.query('UPDATE studentmngsys SET name = ?,address = ? WHERE id = ?', [name, address, id] , (err, rows) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
        })
    });
    
app.listen(8080, () => console.log('Developement server is running on port 8080'));   
            