var express  = require('express');
var path = require('path');
var morgan = require('morgan');             // 리퀘스트 로그
var bodyParser = require('body-parser');    // html 정보
var methodOverride = require('method-override'); // delete,put
var http = require('http');
var app = express();
var todoCtrl = require('./controller/todoController');



// routes ======================================================================


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));                                         // 모든 요청 로그
app.use(bodyParser.json());                                     // application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // application/vnd.api+json as json
app.use(methodOverride());

// Todo 컨트롤러
todoCtrl.todoCtrl(app);


// 서버 스타트...
app.listen(8080);
console.log("App listening on port 8080");