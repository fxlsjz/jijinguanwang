'use strict';
//
app.controller('navcutCtrl', function ($rootScope, $scope, $state, $stateParams, $location, getInterface ,$cookies,ENV,userInfo,$http) {
	$scope.tabName = $state.current.name;
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url.split('/');
	  	$scope.tabName = '/'+url[1];
//	  	alert($scope.tabName);
	  	scrollTo(0,0); //滚动到顶部
	});

	$scope.Login = function(){
		window.location.href = 'http://managerh5.test.chinamobo.com/#/login';
	}
		//产品介绍
	$http.get("../apps/txt/navCut/nav_bar_one.txt")
    .success(function (response) 
    {    	
    	$scope.barOne = response.navOne;
    });
		//解决方案
	$http.get("../apps/txt/navCut/nav_bar_two.txt")
    .success(function (response) 
    {    	
    	$scope.barTwo = response.navTwo;
    });
    	//关于我们
    $http.get("../apps/txt/navCut/nav_bar_three.txt")
    .success(function (response) 
    {    	
    	$scope.barThree = response.navThree;
    });
    	//联系我们
    $http.get("../apps/txt/navCut/nav_bar_four.txt")
    .success(function (response) 
    {    	
    	$scope.barF = response.navFour;
    });
    
    $scope.jumpProduct = function(i){
    	$state.go('navCut.product',{hashID: 'offset'+i, rnd: parseInt(100*Math.random())});
//  	window.location.href="http://m.office.com:801/#/navCut/product/" + i +"#offset" +i;
    }
    $scope.jumpSolution = function(s){
    	$state.go('navCut.solution',{hashIDS: 'offsetS'+s,rndS:parseInt(100*Math.random())});	
    }
    $scope.jumpAbout = function(a){
//  	alert(i);
    	if(a==0){
    		$state.go('navCut.about.aboutCompany');	
    	}
    	if(a==1){
    		$state.go('navCut.about.aboutTeam');	
    	}
    	if(a==2){
    		$state.go('navCut.about.aboutExpert');	
    	}
    	if(a==3){
    		$state.go('navCut.about.aboutPartner');	
    	}
    }
    
});
