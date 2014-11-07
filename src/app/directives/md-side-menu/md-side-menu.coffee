# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
window.app
.directive('mdSideMenu', [
  ->
    mdSideMenuCtrl = ($scope) ->
      $scope.internalItems = $scope.items or []
      if $scope.internalItems not instanceof Array
        $scope.internalItems = [$scope.internalItems]
      $scope.open = no
      $scope.menuHover = no
      $scope.internalItemClick = (item, $index) ->
        doClick = yes
        if $scope.itemClick instanceof Function
          doClick = $scope.itemClick(item, $index) isnt false
        if doClick and item.click instanceof Function
          item.click()
    return {
      restrict: 'E',
      scope: {
        items: '=items'
        menuClick: '=menuClick'
        itemClick: '=itemClick'
      },
      controller: ['$scope', mdSideMenuCtrl],
      templateUrl: 'app/directives/md-side-menu/md-side-menu.html'
    }
])