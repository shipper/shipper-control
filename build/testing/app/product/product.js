(function() {
  window.app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/product', {
        controller: 'ProductCtrl',
        templateUrl: 'app/product/product.html'
      }).when('/product/:productId', {
        controller: 'ProductCtrl',
        templateUrl: 'app/product/product.html'
      });
    }
  ]).controller('ProductCtrl', ['$scope', '$location', function($scope, $location) {}]);

}).call(this);
