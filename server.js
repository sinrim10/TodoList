var express  = require('express');
var app      = express();                               // express 모듈사용
var mongoose = require('mongoose');                     // 몽고디비 모듈
var morgan = require('morgan');             // 리퀘스트 로그
var bodyParser = require('body-parser');    // html 정보
var methodOverride = require('method-override'); // delete,put

//express 설정

mongoose.connect('mongodb://localhost:27017/todolist');     // 몽고디비연결

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));                                         // 모든 요청 로그
app.use(bodyParser.urlencoded({'extended':'true'}));            //application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // application/vnd.api+json as json
app.use(methodOverride());

// define model =================
var Todo = mongoose.model('Todo', {
    text : String
});

// routes ======================================================================

// restapi 시작
// 모든 데이터 조회
app.get('/api/todos', function(req, res) {

    Todo.find(function(err, todos) {

        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
});

// post 요청 처리
app.post('/api/todos', function(req, res) {

    // 앵귤러로 부터 넘어온 데이터 mongodb에 생성
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // 생성한 후 조회
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete 처리 리스트 삭제
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // 삭제하고 리스트조회
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

// 클라이언트 화면호출
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});
// 서버 스타트...
app.listen(8080);
console.log("App listening on port 8080");