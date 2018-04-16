var app = angular.module('fundApp',['ui.router','ui.bootstrap','oc.lazyLoad', 'ngCookies']);
app.provider('helper', function () {
    var name = 'world';

    this.$get = function () {
        return {
            sayHello: function () {
                console.log('hello ' + name);
            }
        };
    };

    this.loadModuleFile = function (modules, file) {
        var files = angular.isArray(file) ? file : [file];
        var modules_files = [];
        angular.forEach(files, function (value, index, objs) {
            var path = 'templates';
            var filename = path + '/' + value;
            var module = modules;
            if (angular.isArray(modules)){
                module = modules[index];
            }
            if (value.indexOf('/') != -1){
                filename = value;
            }else if (value.indexOf('.js') != -1) {
                filename = 'controllers/' + value;
            } else if (value.indexOf('.css') != -1) {
                filename = 'css/' + value;
            }
            modules_files.push('apps/modules/' + module + '/' + filename);
        });
        return angular.isArray(file) ? modules_files : modules_files.join('');
    }
});
//app.run(function ($templateCache,$rootScope, $state, $stateParams, $cookies, $window, $location, $timeout,  ENV, userInfo, Authentication) {
//	$rootScope.$on('$stateChangeStart', function (event, next, toState, toParams, fromState, fromParams) {
//      Authentication.authorized(event, next);
//
//	});
//  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {  
//
//  }); 
//
//})

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', '$httpProvider', 'helperProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, $httpProvider, helperProvider) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
            app.value = $provide.value;
            app.stateProvider = $stateProvider;

            //app.helperProvider = helperProvider;
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|wxlocalresource|weixin):/);


            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            //$compileProvider.debugInfoEnabled(false);

            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    }
                    else if (value !== undefined && value !== null)
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            // Override $http service's default transformRequest
            $httpProvider.defaults.transformRequest = [function (data) {
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }];


            //$ionicConfigProvider.views.maxCache(1);

            //$ionicConfigProvider.scrolling.jsScrolling(false);
            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js

    $urlRouterProvider.when("", "/navCut/index");
//  $locationProvider.html5Mode(true);

    $stateProvider
   		//首页
   		.state('navCut', {
            url: '/navCut',
            templateUrl: 'apps/templates/navcut.html',
            controller: 'navcutCtrl',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(helperProvider.loadModuleFile('index', ['navcut.css', 'navcutCtrl.js']));
                }]
            }
        })
  		
        
}]);