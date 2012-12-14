// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/product/:manufacturer/:productId/?:uid/?:section', {templateUrl: 'partials/product.html', controller: ProductController});
    $routeProvider.otherwise({redirectTo: '/product/kohler/k-690'});
  }]);


