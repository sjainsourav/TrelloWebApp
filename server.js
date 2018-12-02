const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var bodyParser = require('body-parser');

var passport = require('passport');
var social = require('./passport/passport')(app, passport);

var app = express();
var userroute = require('./routes/user.js')

var port = process.env.PORT || 5000;

// // Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/dist/newapp2'));

// app.get('/*', function(req,res) {
    
// res.sendFile(path.join(__dirname+'/dist/newapp2/index.html'));
// });

mongoose.connect('mongodb://trello1008:password123@ds243212.mlab.com:43212/mytrello', { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('Connected to MongoDB');
});

app.use(express.static(path.join(__dirname, 'dist/newapp2')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/user', userroute)

// app.use(function(req,res){
//     res.sendFile(__dirname,'dist/newapp2/index.html')
// });

app.get('*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, 'dist/newapp2') })
});

app.listen(port, function () {
    console.log("Listening on port " + port)
});