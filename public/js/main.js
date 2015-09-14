
angular.module('index', []);
//앵귤러 컨트롤러
function mainController($scope, $http) {
    $scope.formData = {};
    $scope.error = "";
    //get 할일 조회
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    //post 할일 생성
    $scope.createTodo = function() {
        console.log("aa : " + $scope.formData.text);

        if($scope.formData.text === undefined || $scope.formData.text === ""){
            //alert('입력 하세요');
            $scope.error = '할일을 입력하세요';
            return;
        } else{
            $scope.error = '';
        }
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //delete 할일 삭제
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.search = function (){ 
    	 
    	/**/
    	$http.get('/api/todos/'+$scope.search_txt)
    			.success(function(data){
    				$scope.todos = data;
    				console.log(data);
    			})
    			.error(function(data){
    				console.log('Error : ' + data);
    			})
    	/**/
    }
}