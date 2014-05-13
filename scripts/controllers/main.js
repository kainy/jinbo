'use strict';

angular.module('JinboApp')
.controller('MainCtrl', function ($scope) {
	$scope.awesomeThings = [
		'分类查看',
		'排序',
		'定时刷新'
	];

	WB2.anyWhere(function(W){
		W.widget.connectButton({
			id: "wb_connect_btn",
			type: '3,2',
			callback : {
				login:function(o){
					location.hash= '!/weibo';
				},
				logout: function(){
					location.hash= '!/';
				}
			}
		});
	});
})
.controller('WeiboListCtrl', function ($scope, dateFilter, $timeout, $cookies, weiboFactory, $route, $routeParams, $location) {
	WB2.anyWhere(function(W){
		W.widget.connectButton({
			id: "wb_connect_btn",
			type: '3,2',
			callback : {
				login:function(o){
					location.hash= '!/weibo';
				},
				logout: function(){
					location.hash= '!/';
				}
			}
		});
	});

	$scope.type = 'friends_timeline';
	$scope.orderProp = '-created_at';
	$scope.count = 20;
	$scope.interval = 0;
	$scope.page= 0;//由loadMore自增为1

	$scope.setType= function(){
		$scope.page= 1;
		$scope.update();
	};
	$scope.loadMore= function(){
		$scope.page+= 1;
		$scope.update({
			append: true
		});
	};
	$scope.update = function (opt) {
//		console.log( $route, $routeParams, $location)
		if($scope.type=== 'public_timeline'){
			$scope.page= 1;
		}
		weiboFactory.get({
			type: $scope.type,
			count: $scope.count,
			page: $scope.page
		}, function(res){
			//console.log(res);
			var statuses= res.data.statuses;
			//避免时间排序问题
			for(var i in statuses){
				statuses[i]['created_at']= new Date(statuses[i]['created_at']);
			}
			console.log($scope.page);
			if(opt&& opt.append&& $scope.statuses){
				$.merge($scope.statuses, statuses);
			}else{
				window.scroll(0, 0);
				$scope.statuses= statuses;
				$scope.page= 1;
			}
			//console.log($scope.statuses)
			//处理at链接
			$timeout(function(){
				WB2.anyWhere(function(W){
					W.widget.hoverCard({
						id: 'weibo-list',
						search: true
					}); 
				});
			}, 50);
		}, function(err){
			console.log('update() fail', err);
		});
	};
	
	$scope.reverseOrder= function(){
		$scope.orderProp= '-'+ $scope.orderProp;
	}
	var stop;
	var loo = function () {
		stop = $timeout(function () {
				$scope.update();
				loo();
				//console.log($scope.interval)
			}, $scope.interval * 1000);
	};
	$scope.setInterval = function () {
		$scope.update();
		$timeout.cancel(stop);
		//console.log($scope.interval== 0)
		if ($scope.interval != 0) {
			loo();
		}
	}

	//$scope.update();
})
;