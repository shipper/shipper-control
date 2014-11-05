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

])
