app.controller('aboutCompanyCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$http) {
	
	$http.get("../apps/txt/about/aboutCompany.txt")
    .success(function (response) 
    {
    	$scope.aboutCompany = response.aboutCompany;
    	$scope.aContent = $scope.aboutCompany[0].content;
    	$scope.aImages = $scope.aboutCompany[0].images;
    });
	
})