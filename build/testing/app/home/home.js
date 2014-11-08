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
    '$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
      $scope.items = function() {
        return $location.path('items');
      };
      return $rootScope.$broadcast('enable-search');
    }
  ]);

}).call(this);
