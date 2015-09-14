
// 비즈니스 로직
var todo = require('../model/todo');

exports.todoCtrl = function (app){
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

}
