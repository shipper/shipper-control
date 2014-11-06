# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
window.app
.factory('showSelect', [
    '$mdDialog',
    '$timeout',
    ($mdDialog, $timeout) ->
      return (header, items, $event, selected, hideFilter, shown) ->
        $mdDialog.show({
          targetEvent: $event,
          locals: {
            options: {
              header: header,
              items: items,
              selected: selected
              hideFilter: hideFilter
            }
          },
          controller: 'SelectCtrl',
          templateUrl: 'app/select-dialog/select-dialog.html'
        })
])
.controller('SelectCtrl', [
    '$scope',
    '$mdDialog',
    'options',
    ($scope, $mdDialog, options) ->
      options = options or {}
      $scope.items = options.items
      $scope.header = options.header
      $scope.hideFilter = !!options.hideFilter
      $scope.filter = {
        value: ''
      }
      $scope.okay = ->
        $mdDialog.hide($scope.selectedItem)
      $scope.selectedItem = options.selected or $scope.items[0]
      $scope.loadIndex = 0
])