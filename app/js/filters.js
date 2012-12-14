/* Filters */
angular.module('myApp.filters', []).
	filter('interpolate', ['version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}]).filter('dollars', function() {
		return function(input) {
			return "$"+(+input).toFixed(2);
		};
	}).filter('imagepath',function(){
		return function(name,manufacturer,resize){
			return "http://s1.img-b.com/build.com/imagebase/"+(resize?'resized/'+resize+'/' :'')+ manufacturer.replace(/\s+/g, "").toLowerCase() + "images/" +name;
		};
	});
