(function() {
  window.app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'app/login/login.html'
      });
    }
  ]).controller('LoginCtrl', [
    '$scope', '$location', function($scope, $location) {
      $scope.username = '';
      $scope.password = '';
      return $scope.signIn = function() {
        if ($scope.username === 'Fabian' && $scope.password === 'password') {
          return $location.path('home');
        }
      };
    }
  ]);

}).call(this);
