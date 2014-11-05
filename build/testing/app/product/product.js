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
  ]).controller('ProductCtrl', [
    '$scope', '$location', function($scope, $location) {
      $scope.dimensions = {
        imperial: false,
        length: '',
        width: '',
        height: '',
        volume: '',
        calculateVolume: function() {
          var cubic, height, length, width;
          length = parseFloat($scope.dimensions.length);
          width = parseFloat($scope.dimensions.width);
          height = parseFloat($scope.dimensions.height);
          if (isNaN(length) || isNaN(width) || isNaN(height)) {
            return '';
          }
          if (length === 0 || width === 0 || height === 0) {
            return '';
          }
          cubic = length * width * height;
          if ($scope.dimensions.imperial) {
            cubic *= 1 / 12;
          }
          cubic = Math.floor(cubic * 100) / 100;
          return $scope.dimensions.volume = cubic.toString();
        }
      };
      return $scope.general = {};
    }
  ]);

}).call(this);
