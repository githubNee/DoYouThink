var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

var path = require('path');
var port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0');
var request = require('request');
var bodyParser = require('body-parser');

// 跨域访问
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , PRIVATE-TOKEN');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

var pan = require('./routes/pan');
app.use('/api/pan', pan);

var account = require('./routes/account');
app.use('/api/account', account);
