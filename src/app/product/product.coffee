# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
window.app
.config(['$routeProvider', ($routeProvider) ->
    $routeProvider
    .when('/product',
      controller: 'ProductCtrl'
      templateUrl: 'app/product/product.html'
    )
    .when('/product/:productId',
      controller: 'ProductCtrl'
      templateUrl: 'app/product/product.html'
    )
  ])
.controller( 'ProductCtrl', ['$scope', '$location', ($scope, $location) ->
  $scope.dimensions = {
    imperial: false
    length: ''
    width: ''
    height: ''
    volume: ''
    calculateVolume: ->
      length = parseFloat($scope.dimensions.length)
      width = parseFloat($scope.dimensions.width)
      height = parseFloat($scope.dimensions.height)
      if isNaN(length) or isNaN(width) or isNaN(height)
        return ''
      if length is 0 or width is 0 or height is 0
        return ''
      cubic = length * width * height
      if $scope.dimensions.imperial
        cubic *= 1/12
      cubic = Math.floor(cubic * 100) / 100
      $scope.dimensions.volume = cubic.toString()
  }
  $scope.general = {}
])
