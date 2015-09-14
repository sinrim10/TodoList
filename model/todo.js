
/**  디비 커넥션 설정 */
var mongoose = require('mongoose');                     // 몽고디비 모듈
mongoose.connect('mongodb://localhost:27017/todolist');     // 몽고디비연결
/** 설정 끝 */

// define model =================
var Todo = mongoose.model('Todo', {
    text : String
});

// 초기 페이지
exports.init = function(req, res){
  
  Todo.find(function(err, todos) {

      if (err)
          res.send(err)
          
      console.log(todos);
      
      res.json(todos); // return all todos in JSON format
  });
  
};

// 입력 부분

exports.todoInsert = function (req, res){
	
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
	  
}

// 검색
exports.search = function(req, res){
	
  // like 문
  var searchTitle = new RegExp(req.params.search, "i");
	
  Todo.find({
  	text : searchTitle
  },	function(err, todo) {

      if (err)
          res.send(err)
      if(todo){
      	 res.json(todo); // return all todos in JSON format
      }else{
      	 res.json({"text":"ddd"})
      }
     
  });
}

// 삭제
exports.todoDelete = function(req, res){
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
}
