'use strict';

app.controller('IndexCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$http) {
 
    $scope.myInterval = 2000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var currIndex = 0;
  	var slides = $scope.slides = [];
	$http.get("../apps/txt/index/index_banner.txt")
        .success(function (response) 
        {
        	var banner = response.banner;
        	angular.forEach(banner,function(data){
        		slides.push({
				    image: data.images,
				    id: currIndex++
				});
        	})
        		
        	
        });

       
    $http.get("../apps/txt/index/index_product.txt")
	    .success(function (response) 
	    {
	    	$scope.names = response.sites;
	    	
	//      	console.log($scope.names)
	//			$scope.images = {
	//				"background":"url()"
	//			}
	//			console.log($scope.images)
	    });
		
		
		
       
        
})

