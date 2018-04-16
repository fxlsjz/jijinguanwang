app.controller('SolutionCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$http,$anchorScroll,$window) {
	
	$http.get("../apps/txt/solution/solution_index.txt")
    .success(function (response) 
    {
    	$scope.solution = response.solutionIndex;      	
    });
    
    var goHashID = $location.search()['hashIDS'] || '';	
	$scope.go = function(id){
		$location.hash(id);
    	$anchorScroll.yOffset = 100;
		$anchorScroll();
	}
	//$scope.go(goHashID);
	if (goHashID){
		setTimeout(function(){
			$scope.go(goHashID);
		}, 50)
	    
   	}
//  var offsetS = $stateParams.s;
//  console.log(offsetS)
//  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
//  		//想要滚动到的元素的id
//  	$location.hash("offset"+offsetS);
//  	$anchorScroll.yOffset = 100;
//  		 //调用 $anchorScroll()
//		$anchorScroll();
//	});
//	var offsetS = $stateParams.s;
////  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
//		var offsets = "offsetS"+offsetS;
//		console.log(offsets);
////  	$location.hash("offsetS"+offsetS);
//  	$location.hash(offsets);
//  	$anchorScroll.yOffset = 100;
//		$anchorScroll();
//	});
	
})