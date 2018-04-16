'use strict';
angular.module('fundApp')
	.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'helperProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, helperProvider) {
            $stateProvider.state('navCut.index', {
                    url: "/index", 
                        controller: 'IndexCtrl',
                        templateUrl: 'apps/modules/index/templates/index.html',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(helperProvider.loadModuleFile('index', [ 'index.css','IndexCtrl.js']));
                        }]
                    }
                })
}]);
