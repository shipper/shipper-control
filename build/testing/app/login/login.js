(function() {
  var LoginCtrl;

  LoginCtrl = function($scope, $location, AuthService, $mdDialog) {
    var alert, dialog;
    if (AuthService.isAuthenticated()) {
      $location.path('/home');
      return;
    }
    if (AuthService.$Session.dirty) {
      alert = $mdDialog.alert().title("Attempting to restore previous session");
      dialog = $mdDialog.show(alert);
    }
    $scope.username = '';
    $scope.password = '';
    $scope.error = false;
    return $scope.signIn = function() {
      $scope.error = false;
      return AuthService.login({
        username: $scope.username,
        password: $scope.password
      }).then(function() {
        $scope.username = '';
        $scope.password = '';
        return $location.path("/home");
      }).fail(function() {
        $scope.password = '';
        return $scope.error = true;
      });
    };
  };

  LoginCtrl.$inject = ['$scope', '$location', 'AuthService', '$mdDialog'];

  angular.module("ngShipper").config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'app/login/login.html',
        data: {
          anonymous: true
        }
      });
    }
  ]).controller('LoginCtrl', LoginCtrl);

}).call(this);
