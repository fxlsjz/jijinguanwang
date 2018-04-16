'use strict';
angular.module('fundApp')
	.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'helperProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, helperProvider) {
            $stateProvider.state('navCut.about', {
                    url: "/about", 
                        controller: 'AboutCtrl',
                        templateUrl: 'apps/modules/about/templates/index.html',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(helperProvider.loadModuleFile('about', [ 'about.css','AboutCtrl.js']));
                        }]
                    }
                })
            
            //公司介绍
            .state('navCut.about.aboutCompany', {
                    url: "/about/aboutCompany", 
                        controller: 'aboutCompanyCtrl',
                        templateUrl: 'apps/modules/about/templates/aboutCompany.html',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(helperProvider.loadModuleFile('about', [ 'aboutCompany.css','aboutCompany.js']));
                        }]
                    }
                })
            //团队介绍
            .state('navCut.about.aboutTeam', {
                    url: "/about/aboutTeam", 
                        controller: 'aboutTeamCtrl',
                        templateUrl: 'apps/modules/about/templates/aboutTeam.html',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(helperProvider.loadModuleFile('about', [ 'aboutTeam.css','aboutTeam.js']));
                        }]
                    }
                })
            //顾问专家
            .state('navCut.about.aboutExpert', {
                    url: "/about/aboutExpert", 
                        controller: 'aboutExpertCtrl',
                        templateUrl: 'apps/modules/about/templates/aboutExpert.html',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(helperProvider.loadModuleFile('about', [ 'aboutExpert.css','aboutExpert.js']));
                        }]
                    }
                })
            //合作伙伴
            .state('navCut.about.aboutPartner', {
                    url: "/about/aboutPartner", 
                        controller: 'aboutPartnerCtrl',
                        templateUrl: 'apps/modules/about/templates/aboutPartner.html',
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(helperProvider.loadModuleFile('about', [ 'aboutPartner.css','aboutPartner.js']));
                        }]
                    }
                })
}]);