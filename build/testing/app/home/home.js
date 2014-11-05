(function() {
  window.app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/home', {
        controller: 'HomeCtrl',
        templateUrl: 'app/home/home.html'
      });
    }
  ]).controller('HomeCtrl', ['$scope', function($scope) {}]);

}).call(this);
