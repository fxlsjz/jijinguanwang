app.controller('ContactCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$http) {
	$scope.myInterval = 2000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var currIndex = 0;
  	var slides = $scope.slides = [];
	$http.get("../apps/txt/contact/contact_bannerC.txt")
        .success(function (response) 
        {
        	var bannerC = response.bannerC;
        	angular.forEach(bannerC,function(data){
        		slides.push({
				    image: data.images,
				    id: currIndex++
				});
        	})
        		
        	
        });
})