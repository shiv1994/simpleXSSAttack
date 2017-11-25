// Requirements

var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// Usages and path information.

var app = express();

var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json()); 

app.use(cors());

var path = __dirname + '/views/';

// MySQL Connection information.

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'shiv2',
  password : 'fred23',
  database : 'user_desc'
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");  
    } else {
        console.log("Error connecting database ... \n\n");  
    }
});

// Requests Section.

router.get("/allPosts",function(req,res){
      res.sendFile(path + 'main.html');
});

router.post("/newPost", function(req,res){
    // Grab message from body without sanitizing and store to database.
    var posts = [];
    var message = req.body.posted_message;
    var sql = "INSERT INTO user_posts (post) VALUES ('"+message+"')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      // Pulling all posts from database and sending as post message.
      var sql = "SELECT * FROM user_posts";
      connection.query(sql, function(err, rows, fields) {
        if (!err){
            res.json({message:rows});
        }
        else{
            console.log('Error while performing Query.');
            res.json({message:[]});
        }
      });
    });
});

app.use('/', router);
   
app.listen(3000);
