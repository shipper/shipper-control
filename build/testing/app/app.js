(function() {
  window.app = angular.module('ngShipper', ['ngMaterial', 'ngRoute', 'angular-inview']).controller('AppCtrl', [
    '$scope', function($scope) {
      $scope.$on('$routeChangeStart', function() {
        return $scope.hideNav = false;
      });
      $scope.$on('hide-nav', function() {
        return $scope.hideNav = true;
      });
      return $scope.$on('show-nav', function() {
        return $scope.hideNav = false;
      });
    }
  ]);

}).call(this);
