'use strict';

/* Controllers */


function ProductController($scope,$http) {
	
	var productId = 'k-690',
		manufacturer = 'kohler';
	$http.get('/api/build-product-webservices-1.0.0/services/products?productId='+productId+'&manufacturer='+manufacturer).success(function(data){
		data = data.filter(function(finish){
			return finish.status == 'stock';
		});
		var p = data[0],
			finish;
		p.finishes = [];

		for(var i = 0,len=data.length;i<len;i++){
			
			finish = data[i];
			p.finishes.push({
				image: finish.image,
				name: finish.finish,
				cost: finish.cost
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
