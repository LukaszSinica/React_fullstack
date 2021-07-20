const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : '1234',
    database        : 'bookstore'
})

app.get('/podaj-dane',(req,res)=>{

    pool.getConnection((err,connection)=>{
        connection.query('SELECT * FROM books',(err,rows)=>{
            connection.release()
            res.send(rows)
        })
    })
})
app.post('/dodaj',(req,res)=>{
    pool.getConnection((err,connection)=>{
        const params = req.body
        console.log(params)
        connection.query('INSERT INTO books(autor,tytul) VALUES (?,?)',[params.autor,params.tytul], (err, result) => {
            connection.release()
            res.send(result)
        })
    })
})

app.delete('/usun', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query('DELETE FROM books WHERE id = (?)',[req.body.id], (err, rows) => {
            connection.release() // return the connection to pool
            res.send(rows)
        })
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`))