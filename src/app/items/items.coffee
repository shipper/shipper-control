# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
window.app
.config(['$routeProvider', ($routeProvider) ->
    $routeProvider
    .when('/items',
      controller: 'ItemsCtrl'
      templateUrl: 'app/items/items.html'
    )
  ])
.controller( 'ItemsCtrl', ['$scope', '$location', '$rootScope', ($scope, $location, $rootScope) ->
  $scope.sideMenu = {
    icon: 'images/icons/ic_add_24px.svg'
    tooltip: 'Add Item'
    click: ->
      $location.path('item')
  }
  $rootScope.$broadcast('enable-search')
  $scope.items = [
    {
      description: 'test'
      descriptionExtended: 'test'
      sku: 'ABC'
      variations: [
        {
          sku: 'ABC:1'
          description: 'TEST'
        }
      ]
    }
    {
      description: 'test'
      descriptionExtended: 'test'
      sku: 'ABCD'
      variations: [
        {
          sku: 'ABCD:1'
          description: 'TEST'
        }
        {
          sku: 'ABCD:2'
          description: 'TEST'
        }
      ]
    }
  ]

  $scope.selectedAll = no

  $scope.select = (item) ->
    if $scope.selectedAll or item.selected
      $scope.selectedAll = no
      return
    for item in $scope.items
      if item is item
        continue
      if not item.selected
        return
    $scope.selectedAll = yes

  $scope.selectAll = ->
    select = not $scope.selectedAll
    for item in $scope.items
      item.selected = select
])
