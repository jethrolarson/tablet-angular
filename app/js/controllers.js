'use strict';

/* Controllers */


function ProductController($scope,$http, $routeParams) {
	
	var productId = $routeParams.productId,
		manufacturer = $routeParams.manufacturer;
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
		$scope.product = p;
	});
	$http.get('/api/build-product-webservices-1.0.0/services/products/imageGallery?productId='+productId+'&manufacturer='+manufacturer).success(function(data){
		$scope.media = data;
	});
}
// ProductController.$inject = ['$scope,$http'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
