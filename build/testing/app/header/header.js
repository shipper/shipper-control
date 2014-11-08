(function() {
  window.app.controller('HeaderCtrl', [
    '$scope', '$timeout', function($scope, $timeout) {
      $scope.search = false;
      $scope.enableSearch = false;
      $scope.$on('enable-search', function() {
        return $scope.enableSearch = true;
      });
      $scope.$on('$routeChangeStart', function() {
        return $scope.enableSearch = false;
      });
      $scope.exitSearch = function() {
        $scope.search = false;
        $scope.term = '';
        return console.log('exit search');
      };
      $scope.titleClick = function() {
        if ($scope.search) {
          $scope.exitSearch();
        }
      };
      $scope.menuClick = function() {
        if ($scope.search) {
          $scope.exitSearch();
        }
      };
      $scope.searchClick = function() {
        return $scope.search = true;
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
      return angular.element('.search-content').on('click', function(event) {
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
    }
  ]);

}).call(this);
