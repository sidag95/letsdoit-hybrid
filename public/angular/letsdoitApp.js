angular.module('letsdoitApp', []);

var taskListCtrl = function($scope, letsdoitData){
	$scope.message = "Loading your Tasks List . . .";
	letsdoitData
		.success(function(data){
			$scope.message = data.length > 0? "" : "Hurray! No more tasks left.";
			$scope.data = { tasks : data };
		})
		.error(function(e){
			$scope.message = "Sorry, something's gone wrong. Please Try again";
		});
};

var letsdoitData = function($http){
	return $http.get('/api/tasks');
};

angular.module('letsdoitApp').controller('taskListCtrl', taskListCtrl).service('letsdoitData', letsdoitData);