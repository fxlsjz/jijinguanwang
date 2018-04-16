'use strict';
/**
 * 登录注册模块
 */
angular.module('fundApp')

    .config(['$stateProvider', '$locationProvider', '$ionicConfigProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'helperProvider',
            function ($stateProvider, $locationProvider, $ionicConfigProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, helperProvider) {
               $stateProvider.state('tab.Attention', {
               url: '/attention', // root route
                //cache: false,
                
                views: {
                    "Attention": {
                        //controller: 'CourseIndexCtrl', 
                        templateUrl: 'apps/modules/attention/templates/page1.html'
                    }
                },
                resolve: { 
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(helperProvider.loadModuleFile('course', ['course.css', 'CourseIndexCtrl.js']));
                    }]
                }
            })

                    
            }]);
