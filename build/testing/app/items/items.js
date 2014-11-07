(function() {
  window.app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/items', {
        controller: 'ItemsCtrl',
        templateUrl: 'app/items/items.html'
      });
    }
  ]).controller('ItemsCtrl', [
    '$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
      $rootScope.$broadcast('hide-nav');
      $scope.$on('$routeChangeStart', function(next) {
        if (next === 'items' || next === '/items') {
          return $rootScope.$broadcast('hide-nav');
        }
      });
      $scope.sideMenu = {
        icon: 'images/icons/ic_add_24px.svg',
        tooltip: 'Add Item',
        click: function() {
          return $location.path('item');
        }
      };
      $scope.items = [
        {
          description: 'test',
          descriptionExtended: 'test',
          sku: 'ABC',
          variations: [
            {
              sku: 'ABC:1',
              description: 'TEST'
            }
          ]
        }, {
          description: 'test',
          descriptionExtended: 'test',
          sku: 'ABCD',
          variations: [
            {
              sku: 'ABCD:1',
              description: 'TEST'
            }, {
              sku: 'ABCD:2',
              description: 'TEST'
            }
          ]
        }
      ];
      $scope.selectedAll = false;
      $scope.select = function(item) {
        var _i, _len, _ref;
        if ($scope.selectedAll || item.selected) {
          $scope.selectedAll = false;
          return;
        }
        _ref = $scope.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          if (item === item) {
            continue;
          }
          if (!item.selected) {
            return;
          }
        }
        return $scope.selectedAll = true;
      };
      return $scope.selectAll = function() {
        var item, select, _i, _len, _ref, _results;
        select = !$scope.selectedAll;
        _ref = $scope.items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(item.selected = select);
        }
        return _results;
      };
    }
  ]);

}).call(this);
