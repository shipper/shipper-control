# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
window.app
.config(['$routeProvider', ($routeProvider) ->
    $routeProvider
    .when('/home',
      controller: 'HomeCtrl'
      templateUrl: 'app/home/home.html'
    )
    .otherwise({
      redirectTo: 'home'
    })
  ])
.controller( 'HomeCtrl', ['$scope', '$location', ($scope, $location) ->
  $scope.items = ->
    $location.path('items')
])
