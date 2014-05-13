'use strict';

angular.module('JinboApp')
.factory('weiboFactory', function ($resource, $cookies) {
	// Service logic
	var access_token;
	for(var i in $cookies){
		if(i.indexOf('weibojs_')=== 0){
			var str= 'access_token=';
			var start= $cookies[i].indexOf(str)+ str.length;
			access_token= $cookies[i].substring(start, start+ 32);
		}
	};
	//console.log(access_token)

	// Public API here
	return $resource('https://api.weibo.com/2/statuses/:type.json', {
		source : -~1807013048,
		access_token: access_token,
		callback : 'JSON_CALLBACK'
	}, {
		get : {
			method : 'JSONP',
			params : {
				from : 'jinbo.Kainy.CN'
			}
		}
	})
});