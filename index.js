var express  = require('express');
var path = require('path');
var morgan = require('morgan');             // 리퀘스트 로그
var bodyParser = require('body-parser');    // html 정보
var methodOverride = require('method-override'); // delete,put
var http = require('http');

var todoCtrl = require('./controller/todoController');
var todo = require('./model/todo');

// routes ======================================================================

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));                                         // 모든 요청 로그
app.use(bodyParser.json());                                     // application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // application/vnd.api+json as json
app.use(methodOverride());


//모든 데이터 조회
app.get('/api/todos', function(req, res) {

	todo.init(req,res);
});

//post 요청 처리
app.post('/api/todos', function(req, res) {

	todo.todoInsert(req,res);
});

//검색
app.get('/api/todos/:search', function(req, res) {
	todo.search(req,res);
});


//delete 처리 리스트 삭제
app.delete('/api/todos/:todo_id', function(req, res) {
	todo.todoDetele(req,res);
});



// 서버 스타트...
app.listen(8080);
console.log("App listening on port 8080");