var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user : 'debjde6400',
    database : 'debjde6400',
    host: 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date.toDateString()}
        </div>
        <div>
            ${content}
        </div>
        </div>
    </body>
</html>`;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    //to create a hash
    var hashed = crypto.pbkdf2Sync(input,salt,1000,512,'sha512');
    return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');
}

app.post('/create-user',function(req,res){
   //username,password
   //{"username" : "abc","password" : "1234"}
   //JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1, $2)',[username,dbString],function(err,result){
       if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send("User successfully created : "+username);
        }
   });
});

app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input,'a-chosen-text');
    res.send(hashedString);
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return the response with results
    pool.query("SELECT * FROM test",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter = 0;
app.get('/counter', function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res){ // /submit-name?name=xxxx
    //var name= req.params.name;
    var name= req.query.name;
    names.push(name);
    //json convet js objs to st
    res.send(JSON.stringify(names));
});


app.get('/articles/:articleName', function (req,res) {
    //articleName == article-one
    //articles[articleName] == {} content object for article one
    pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length===0){
                res.status(404).send('Article not found');
            }
            else{
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/09376_HD.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '09376_HD.jpg'));
});

var names=[];
app.get('/submit-name/:name',function(req,res){
    //var name= req.params.name;
    var name= req.query.name;
    names.push(name);
    //json convet js objs to st
    res.send(JSON.stringify(names));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
