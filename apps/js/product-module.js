'use strict';
angular.module('fundApp')
	.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'helperProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, helperProvider) {
            $stateProvider.state('navCut.product', {
                    url: "/product?hashID&rnd", 
                        controller: 'ProductCtrl',
                        templateUrl: 'apps/modules/product/templates/index.html',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(helperProvider.loadModuleFile('product', [ 'product.css','ProductCtrl.js']));
                        }]
                    }
                })
}]);