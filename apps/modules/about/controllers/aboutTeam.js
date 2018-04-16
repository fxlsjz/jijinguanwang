app.controller('aboutTeamCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData,$http) {
	
	$http.get("../apps/txt/about/aboutTeam.txt")
    .success(function (response) 
    {
    	$scope.aboutTeam = response.aboutTeam;
    	$scope.teamContent = $scope.aboutTeam[0].content;
    	$scope.teamImages = $scope.aboutTeam[0].images;
    });
		
})