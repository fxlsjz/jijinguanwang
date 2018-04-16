app.controller('AboutCtrl', function ($rootScope, $scope, $state, $stateParams, $location,$cookies,userInfo,getInterface,pageData) {
	$scope.aboutName = $state.current.name;
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	$scope.aboutName = '/'+url[2];	
//	  	alert($scope.aboutName)
	});
})