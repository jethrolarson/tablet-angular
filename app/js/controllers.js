'use strict';

/* Controllers */


function ProductController($scope,$http) {
	

	$http.get('/api/build-product-webservices-1.0.0/services/products?productId=k-690&manufacturer=kohler').success(function(data){
		data = data.filter(function(finish){
			return finish.status == 'stock';
		});
		var p = data[0],
			finish;
		p.finishes = [];

		for(var i = 0,len=data.length;i<len;i++){
			
			finish = data[i];
			p.finishes.push({
				image: finish.image
				,name: finish.finish
				,cost: finish.cost
			});
		}
		$scope.product = p;
	});
	$scope.dog = 'woof';
}
// ProductController.$inject = ['$scope,$http'];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
