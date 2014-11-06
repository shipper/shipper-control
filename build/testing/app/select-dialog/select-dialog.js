(function() {
  window.app.factory('showSelect', [
    '$mdDialog', '$timeout', function($mdDialog, $timeout) {
      return function(header, items, $event, selected, hideFilter, shown) {
        return $mdDialog.show({
          targetEvent: $event,
          locals: {
            options: {
              header: header,
              items: items,
              selected: selected,
              hideFilter: hideFilter
            }
          },
          controller: 'SelectCtrl',
          templateUrl: 'app/select-dialog/select-dialog.html'
        });
      };
    }
  ]).controller('SelectCtrl', [
    '$scope', '$mdDialog', 'options', function($scope, $mdDialog, options) {
      options = options || {};
      $scope.items = options.items;
      $scope.header = options.header;
      $scope.hideFilter = !!options.hideFilter;
      $scope.filter = {
        value: ''
      };
      $scope.okay = function() {
        return $mdDialog.hide($scope.selectedItem);
      };
      $scope.selectedItem = options.selected || $scope.items[0];
      return $scope.loadIndex = 0;
    }
  ]);

}).call(this);
