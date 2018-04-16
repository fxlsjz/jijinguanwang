app.controller('ProductCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$http,$anchorScroll,$window) {
	
	$scope.Login = function(){
		window.location.href = 'http://managerh5.test.chinamobo.com/#/login';
	}
	
	var goHashID = $location.search()['hashID'] || '';	
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
		
	$http.get("../apps/txt/product/product_index.txt")
    .success(function (response) 
    {
    	$scope.proList = response.productIndex;
    });
  	
    
})