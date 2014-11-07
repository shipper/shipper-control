(function() {
  window.app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/home', {
        controller: 'HomeCtrl',
        templateUrl: 'app/home/home.html'
      }).otherwise({
        redirectTo: 'home'
      });
    }
  ]).controller('HomeCtrl', [
    '$scope', '$location', function($scope, $location) {
      return $scope.items = function() {
        return $location.path('items');
      };
    }
  ]);

}).call(this);
