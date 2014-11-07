(function() {
  window.app.directive('mdSideMenu', [
    function() {
      var mdSideMenuCtrl;
      mdSideMenuCtrl = function($scope) {
        $scope.internalItems = $scope.items || [];
        if (!($scope.internalItems instanceof Array)) {
          $scope.internalItems = [$scope.internalItems];
        }
        $scope.open = false;
        $scope.menuHover = false;
        return $scope.internalItemClick = function(item, $index) {
          var doClick;
          doClick = true;
          if ($scope.itemClick instanceof Function) {
            doClick = $scope.itemClick(item, $index) !== false;
          }
          if (doClick && item.click instanceof Function) {
            return item.click();
          }
        };
      };
      return {
        restrict: 'E',
        scope: {
          items: '=items',
          menuClick: '=menuClick',
          itemClick: '=itemClick'
        },
        controller: ['$scope', mdSideMenuCtrl],
        templateUrl: 'app/directives/md-side-menu/md-side-menu.html'
      };
    }
  ]);

}).call(this);
