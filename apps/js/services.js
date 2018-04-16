'use strict';

/*
 通用的接口调用类
 author xiongyouliang
 date 2016/7/4
 */

//图片补全路径
app.filter('baseUrl', function () {
    return function (value) {
//  	var url = 'http://m.office.com:801/';
    	var url = 'http://m.webmanager.test.chinamobo.com/';
        if (!value) return url='';
        if(value){
        	url+=value;
        }
        return url;
    };
});
//页面传参
app.service('pageData', function () {
    var savedData = ''
    this.set = function (data) {
        return savedData = data;
    }
    this.get = function () {
        return savedData
    }

});
//HTML片段转义
app.filter('trustHtml', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]
);
app.filter('trustAsResourceUrl', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsResourceUrl(text);
        }
    }]
);
//获取设置用户cookies
app.factory("userInfo", function ($cookies, $cookieStore, $rootScope, $state, $location, $timeout, ENV) {
    var defaultParams = {eid: '0', language: 'zh_CN'};
    var cookies_name = 'userInfo';
    var saveUserInfo = function (userInfoData) {
        var data = angular.extend(defaultParams, $cookies.getObject(cookies_name), userInfoData);
        
        var expireDate = new Date();
//      expireDate.setDate(expireDate.getDate() + 1);
        expireDate.setTime(expireDate.getTime() + 600000)
        $cookies.putObject(cookies_name, data, {'path': '/', 'expires': expireDate});
        console.log(expireDate)
        //alert(angular.toJson(data));
        $rootScope.$_userInfo = data;
    }
    return {
        getObject: function (key) {
            var userInfoData = angular.extend(defaultParams, $cookies.getObject(cookies_name));

            return key ? userInfoData[key] : userInfoData;
        },
        setObject: function (key, value) {
            var userInfoData = $cookies.getObject(cookies_name) || {};
            if (key && value == undefined) {
            	//alert(JSON.stringify(key));
                userInfoData = key;
            } else {
                userInfoData[key] = value;
                //console.log(userInfoData)
            }
            saveUserInfo(userInfoData);
            //console.log(userInfoData)
        },
        resetObject: function (userInfoData) {
            saveUserInfo(userInfoData, true);
        },
//      logout: function (saveUrl) {
////          $cookies.remove(cookies_name, {'path': '/', 'domain': '.moxueyuan.com'});
//          $cookies.remove(cookies_name, {'path': '/'});
//          $rootScope.$_userInfo = defaultParams;
//          if (saveUrl){
//          	var expireDate = new Date();
//              expireDate.setDate(expireDate.getDate() + 1);
////              alert($location.absUrl())
//          	$cookies.put('loginUrl', $location.absUrl(), {'path': '/', 'expires': expireDate});
//          }
////          console.log(1)
//          //saveUserInfo(null);
//      },
		logout: function () {
//          $cookies.remove(cookies_name, {'path': '/', 'domain': '.moxueyuan.com'});
            $cookies.remove(cookies_name, {'path': '/'});
            $rootScope.$_userInfo = defaultParams;            
//          console.log(1)
            //saveUserInfo(null);
        },
        remUrl:function (saveUrl) {
        	if (saveUrl){
            	var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
//              alert($location.absUrl())
            	$cookies.put('loginUrl', $location.absUrl(), {'path': '/', 'expires': expireDate});
           	}
        },
        clear: function (){
            $cookies.remove(cookies_name, {'path': '/', 'domain': '.moxueyuan.com'});
            $cookies.remove(cookies_name, {'path': '/', 'domain': ENV.cookiesDomain});
            $cookies.remove("QyWechatOAuth", {'path': '/', 'domain': ENV.cookiesDomain});
            $rootScope.$_userInfo = defaultParams;
        },
        checkMobile: function (number) {
            var partten = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
            return partten.test(number);
        },
        checkLogin: function () {
            var userInfoData = $cookies.getObject(cookies_name) || {};
            if (!userInfoData.user_id || !userInfoData.token) {
                return false;
            }
            return true;
        },
        refreshPage: function($scope, callback){
            //分享出去的页面，未登录用户登录后返回刷新数据
            $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
                if (fromState.name == 'login' && userInfo.checkLogin()){
                    if (callback){
                        callback(event, toState, toParams, fromState, fromParams);
                    }else{
                        $state.reload();
                    }
                }
            });
        }
    }
});
//接口数据合并处理
app.factory('interfaceHelps', ['userInfo', 'ENV', function (userInfo, ENV) {
    return {
        //接口的访问地址，开发环境不同请修改env.js
        request_url: ENV.apiurl,
        extend_params: function (param) {
            var userInfoData = userInfo.getObject();    
            //var nowTime = new Date().getTime()/1000;
            //console.log(nowTime)
            var params = {
            	service_code: param.service_code,
//              current_index: 1,
//              page_size: 10,
				page_size: 20,
                language: 'zh_CN',
                device_type: 'wechat',
				version:'1.0',
				token:userInfo.getObject('token'),
		        user_id:userInfo.getObject('user_id'),
            };
//          console.log(param.service_code);
//          console.log(userInfoData);
            var results = angular.extend(params, userInfoData, param);
//			var results = angular.extend(params, param);
            //alert(angular.toJson(results));
            return results;
        }
    }
}]);

//接口调用
app.factory('getInterface', ['$rootScope', '$location', '$state', '$stateParams', '$http', '$timeout', 'interfaceHelps', 'Xalert', 'userInfo', function ($rootScope, $location, $state, $stateParams, $http, $timeout, interfaceHelps, Xalert, userInfo) {
    //重新登录, 还没写完
    var checklogin = function (data, params) {
        if (data.error_code == '401' || data.error_code == '400') {

            userInfo.logout();
            $rootScope.loginBackUrl = $location.url();
            window.location.href = "#/login";

            event.preventDefault();
            return false;
        }
        //console.log($stateParams);return false;
        //$location.path("tab/course");
        //$state.go('/tab/course', params || {});
    };
    var startTime = new Date().getTime();
    return {
        request: function (name) {
            return $location.search()[name] || '';
        },
        //提交数据到后台
        post: function (options, call_back_param) {
            var url = interfaceHelps.request_url;
            var params = interfaceHelps.extend_params(options.params);
            $http({
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    //'Accept' : '*/*'
                },
                data: params,
                timeout: 1000 * 30
            }).success(function (data, status, header, config) {
                checklogin(data);
                if (data.status == 'Y') {

                } else if (data.status == 'N') {

                }
                call_back_param(data);
            }).error(function (data, status, header, config) {
                Xalert.loading(data);
                var respTime = new Date().getTime() - startTime;
                if (respTime >= config.timeout) {
                    //alert(respTime)
                } else {
                    //other error hanndling
                }
            });
        },
        //从后台获取数据
        jsonp: function (options, call_back_param) {
            var params = '&jsonpcallback=JSON_CALLBACK';
            options.params = interfaceHelps.extend_params(options.params);
            for (var key in options.params) {
                params += "&" + key + "=" + options.params[key];
            }

            var data = options.data || [];
            var url = interfaceHelps.request_url + options.module + params;
            $http.jsonp(url)
                .success(function (results) {
                    checklogin(results);
                    //分页处理
                    // alert(options.page)
                    if (options.page != false) {
                        var res = options.dataFiled ? results[options.dataFiled] : results.data;
                        angular.forEach(res, function (rows, index, array) {
                            data.push(rows);
                        });
                        options.data = data;

                        //console.log(results.data);
                        options.canLoadMore = true;
                        options.page++;

                        if (!results.page || results.page >= results.pagecount) {
                            options.canLoadMore = false;
                        }
                    }
                    call_back_param(results, options);
                })
                .error(function (data, status) {
                    //alert(status)
                    // Some error occurred
                });
        }

    }

}]);


//用户登录鉴权处理
app.factory('Authentication', ['$rootScope','getInterface', 'userInfo', '$window', '$location','$state','$cookies', function ($rootScope, getInterface, userInfo, $window, $location,$state,$cookies) {

    return {
        authorized: function (event, next, callback) {
            var isAuthorized = true;
            var authorizedRoles = next.authorizedRoles || ['@'];
            if (authorizedRoles) {
                angular.forEach(authorizedRoles, function (value, key) {
                    if (value == '@' || value != '?') {
                        if (!userInfo.checkLogin()) {
                            window.location.href = "#/login";
                            event.preventDefault();
                            return false;
                        }
                    }
                });
            }
            if(userInfo.checkLogin() == true){           	
            	//token,use_id存10分钟
		        var defaultParams = {eid: '0', language: 'zh_CN'};
			    var cookies_name = 'userInfo';
			    var saveUserInfo = function (userInfoData) {
			        var data = angular.extend(defaultParams, $cookies.getObject(cookies_name), userInfoData);		        
			        var expireDate = new Date();
			        expireDate.setTime(expireDate.getTime() + 600000)
			        $cookies.putObject(cookies_name, data, {'path': '/', 'expires': expireDate});
			        console.log(expireDate)
			        $rootScope.$_userInfo = data;
			    };
			    saveUserInfo();
			    console.log(userInfo.getObject('token'));
            }

        }
        
    };
}]);

app.directive('backButton', function () {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {
            element.bind('click', goBack);

            function goBack() {
                history.back();
                scope.$apply();
            }
        }
    }
});


//无数据提示
app.directive('moboNoData', function ($rootScope, $state, $http) {
    return {
        restrict: 'E',
        templateUrl: 'apps/templates/no-data.html',
        scope: {
            icon: '@icon',
            text: '@text',
            layout: '@layout',
            style: '@style',
        }
    }
});

//提醒信息弹窗
app.factory('Xalert', ['$rootScope', function ($rootScope) {
    return {
        loading: function (text, time) {
            
        },
        
        close: function () {
            //post$ionicLoading.close();
        }
    }
}]);

/*截取字符串长度 start*/
app.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || '');
    };
});


/*数字超过最大限制 如99+*/
app.filter('countMax', function () {
    return function (value, max, tail) {
        if (!value) return '';
        value = parseInt(value);
        if (!value) return value;
        if (value > parseInt(max)) {
            value = max + (tail || '');
        }
        return value;
    };
});
//{{ excellentCourse.courseName | cut:true:10:' ...'}}  or ng-bind="taskcourseList.courseName | cut:true:3:' ...'"    //页面里边使用方式
/*截取字符串长度 end*/

/*多语言*/
app.filter('i18n', ['languages', '$i18n', '$rootScope', function (languages, $i18n, $rootScope) {
    return function (value, key) {
        if (!value) return '';
        //$i18n.getBooks(function(language){
        var res = languages[value] || '';
        return key ? res[key] || '' : res;
        //});


    };
}]);

/**
 * 获取字典值的方法
 * @param key  键值key
 * @param type dic_type 字典类型
 * @return 返回结果对像 success为true，则value为字典值
 */
app.getDict = function(key, type)
{
    var result = {};
    result.success = false;
    result.value = key;
    var dictValue;
    if (deadline_key[key])
    {
        dictValue = deadline_key[key];
    }
    if (dictValue)
    {
        result.success = true;
        result.value = dictValue;
    }
    return result;
};
app.filter('Dict', function($rootScope , $http , $q)
{
    return function(input , type)
    {
        var returnVal = input+type;
        if(type)
        {
            var result = app.getDict(input, type);
            if(result.success == false){
            	returnVal = '--'; 
            }
            if (result.success)
            {
                returnVal = result.value;
            }
        }
        return returnVal;
    }
});
app.getDictP = function(key, type)
{
    var result = {};
    result.success = false;
    result.value = key;
    var productValue;    
    if (product_key[key])
    {
        productValue = product_key[key];
    }
    if (productValue)
    {
        result.success = true;
        result.value = productValue;
    }
    return result;
};
app.filter('DictP', function($rootScope , $http , $q)
{
    return function(input , type)
    {
        var returnVal = input+type;
        if(type)
        {
            var result = app.getDictP(input, type);
            if(result.success == false){
            	returnVal = '--'; 
            }
            if (result.success)
            {
                returnVal = result.value;
            }
        }
        return returnVal;
    }
});

app.factory('errorCode',['$http','$window','$state', 'userInfo','$cookies', function($http,$window,$state, userInfo,$cookies,$rootScope,$_userInfo){
	return{
		code:function(res){
//			if (res.error_code == '401') { //身份验证
//				alert(res.error_msg);
////				alert(res.error_code);
//				userInfo.logout(true);
////				$state.go('login');
//				location.href = "#/login";
//				console.log()
////				$window.location.reload();
//				return false;
//			}
			if(res.status == 'Y'){ //接口调通
				console.log(userInfo.getObject('token'))
				if(userInfo.getObject('token')){
					
					var defaultParams = {eid: '0', language: 'zh_CN'};
				    var cookies_name = 'userInfo';
				    var saveUserInfo = function (userInfoData) {
				        var data = angular.extend(defaultParams, $cookies.getObject(cookies_name), userInfoData);
				        
				        var expireDate = new Date();
//				        expireDate.setDate(expireDate.getDate() + 1);
						expireDate.setTime(expireDate.getTime() + 600000)
				        $cookies.putObject(cookies_name, data, {'path': '/', 'expires': expireDate});
				        console.log(expireDate)
//				        if(data.token == undefined){
//							alert("登录已过期，请重新登录");
//							userInfo.logout(true);
////							$state.go('login');
//							location.href = "#/login";
//							return false;
//				        }
//				        alert(angular.toJson(data));
//				        $rootScope.$_userInfo = data;
				   }
				   saveUserInfo();
				   
				}
				
				else{
					console.log(5)
				}
			}
		}
	}
}]);
