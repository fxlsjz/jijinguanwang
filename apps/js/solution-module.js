'use strict';
angular.module('fundApp')
	.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'helperProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, helperProvider) {
            $stateProvider.state('navCut.solution', {
                    url: "/solution?hashIDS&rndS", 
                        controller: 'SolutionCtrl',
                        templateUrl: 'apps/modules/solution/templates/index.html',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(helperProvider.loadModuleFile('solution', [ 'solution.css','SolutionCtrl.js']));
                        }]
                    }
                })
}]);