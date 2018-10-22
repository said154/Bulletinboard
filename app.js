const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { Client } = require('pg');

require('dotenv').config();


let client = new Client({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'said',
  password: process.env.DB_PASSWORD || 'bulletinboard',
  database: process.env.DB_NAME || 'bulletinboard',
});

  

const app = express();

app.use(express.static('/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs')
app.set('views', './views')

client.connect();

app.get ('/', function (request, response) {
    client.query('SELECT * FROM messages', (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            response.render('index', {posts: res.rows});
        }
    });
});


app.get('/newpost', (request,response) =>{
  response.render('newpost',{
  })
})

app.post('/create', function(request, response) {
    var title = request.body.title;
    var body = request.body.body;

    const hadra = 'INSERT INTO messages'
    const text = [title, message]

    client.query(hadra, text, (error, result) => {
        if (error) {
            console.log(error.stack);
        } else {
            response.render('/');
        }
    })
});



app.listen(3000, function(){
  console.log('Server is running on port 3000');
});