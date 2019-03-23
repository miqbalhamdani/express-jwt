const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();

const user = require('./routes/user');
const { authentication } = require('./middlewares/auth');

// tell express to use body parser and logger
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));

app.get('/', function(req, res){
  res.json({"tutorial" : "Build REST API with node.js"});
});

// use router
app.use('/user', user);

// private route
app.get('/home', authentication, function(req, res){
  res.json("Welcome Home!");
});

module.exports = app;