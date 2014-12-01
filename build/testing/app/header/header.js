(function() {
  window.app.controller('HeaderCtrl', [
    '$scope', '$timeout', '$location', 'AuthService', function($scope, $timeout, $location, AuthService) {
      $scope.search = false;
      $scope.enableMenu = true;
      $scope.enableSearch = false;
      $scope.$on('enable-search', function() {
        return $scope.enableSearch = AuthService.isAuthenticated();
      });
      $scope.$on('$routeChangeStart', function(next) {
        return $scope.enableSearch = false;
      });
      $scope.$on('$routeChangeSuccess', function(next) {
        if ($location.path() === 'home' || $location.path() === '/home') {
          return $scope.enableMenu = false;
        } else {
          return $scope.enableMenu = AuthService.isAuthenticated();
        }
      });
      $scope.exitSearch = function() {
        $scope.search = false;
        return $scope.term = '';
      };
      $scope.titleClick = function() {
        if ($scope.search) {
          $scope.exitSearch();
        }
      };
      $scope.menuClick = function() {
        var body;
        if ($scope.search) {
          $scope.exitSearch();
          return;
        }
        $scope.showMenu = !$scope.showMenu;
        body = angular.element('body');
        body[$scope.showMenu ? 'addClass' : 'removeClass']('menu-visible');
      };
      $scope.hideMenu = function() {
        var body;
        $scope.showMenu = false;
        body = angular.element('body');
        body.removeClass('menu-visible');
      };
      $scope.searchClick = function() {
        $scope.search = true;
        return $scope.hideMenu();
      };
      $scope.term = '';
      $scope.searchLoading = false;
      $scope.termChange = function() {
        $scope.items = [];
        $scope.searchLoading = true;
        return $timeout(function() {
          var countries, country, items, _i, _len;
          countries = getCountryList();
          items = [];
          for (_i = 0, _len = countries.length; _i < _len; _i++) {
            country = countries[_i];
            if (!country) {
              continue;
            }
            if (!country.header || !country.subheader) {
              continue;
            }
            items.push("" + country.header + ", " + country.subheader);
          }
          $scope.items = items;
          return $scope.searchLoading = false;
        }, Math.floor(Math.random() * 1500));
      };
      angular.element('#search-content').on('click', function(event) {
        var element;
        element = angular.element(event.target);
        if (!element) {
          return;
        }
        if (element.is("#search-content")) {
          $scope.exitSearch();
        }
        return $scope.$apply();
      });
      return $scope.goto = function(route) {
        $scope.showMenu = false;
        return $location.path(route);
      };
    }
  ]);

}).call(this);
