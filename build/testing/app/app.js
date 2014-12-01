(function() {
  var parseLocation;

  parseLocation = function(location) {
    var i, obj, pair, pairs, _i, _len;
    pairs = location.substring(1).split("&");
    obj = {};
    pair = null;
    i = null;
    for (_i = 0, _len = pairs.length; _i < _len; _i++) {
      i = pairs[_i];
      if (i === "") {
        continue;
      }
      pair = i.split("=");
      obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return obj;
  };

  window.QueryString = parseLocation(window.location.search);

  window.app = angular.module('ngShipper', ['ngMaterial', 'ngRoute', 'angular-inview', 'indexedDB', 'uuid']).controller('AppCtrl', [
    '$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
      $scope.isAuthorized = AuthService.isAuthorized;
      $scope.isAuthenticated = AuthService.isAuthenticated;
      $scope.$on('$routeChangeStart', function(event, route) {
        var data;
        $scope.hideNav = false;
        data = route.$$route.data || {};
        if (!$scope.isAuthenticated() && !data.anonymous) {
          return $location.path("/login");
        }
      });
      $scope.$on('$locationChangeSuccess', function() {
        console.log($location.absUrl());
        return console.log($location.search());
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
