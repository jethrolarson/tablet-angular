'use strict';

/* Controllers */


function ProductController($scope,$http,$routeParams) {
	
	var productId = $routeParams.productId.toLowerCase(),
		manufacturer = $routeParams.manufacturer.toLowerCase();
	$http.get('/api/build-product-webservices-1.0.0/services/products',{
		params: {
			productId: productId,
			manufacturer: manufacturer
		},
		cache: true
	}).success(function(data){
		var p,finish;
		data = data.filter(function(finish){
			return finish.status == 'stock';
		});
		if($routeParams.uid){
			p = data.filter(function(finish){
				return finish.uniqueId == +$routeParams.uid;
			})[0];
		}else{
			p = data[0];
		}
		p.finishes = [];
		for(var i = 0,len=data.length;i<len;i++){
			
			finish = data[i];
			p.finishes.push({
				image: finish.image,
				name: finish.finish,
				cost: finish.cost,
				uid: finish.uniqueId
			});
		}
		document.title = p.manufacturer+" "+ p.productId +" - "+ "Build.com";
		p.rating = 4.5;
		$scope.product = p;
	});
	$http.get('/api/build-product-webservices-1.0.0/services/products/imageGallery',{
		params:{
			productId: productId,
			manufacturer: manufacturer
		},
		cache: true
	}).success(function(data){
		$scope.media = data;
	});

	$scope.openPanel = function(panel){
		$scope.panel = panel;
	};
	$scope.isPanelActive = function(panel){
		return $scope.panel == panel?"on":'';
	};
	$scope.closePanel = function(panel){
		$scope.panel = '';
	};

	$scope.ratingAttr = function(value) {
		var converted = +value; // Make sure we have a number
		var decimal = (converted - parseInt(converted, 10));
		decimal = Math.round(decimal * 10);
		if ( (decimal < 3) || (decimal > 7) ) {
			return Math.round(converted)*10;
		} else {
			return (parseInt(converted, 10)+0.5)*10;
		}
	};
}
// ProductController.$inject = ['$scope,$http'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
