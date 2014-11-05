# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
window.app
.config(['$routeProvider', ($routeProvider) ->
    $routeProvider
    .when('/login',
      controller: 'LoginCtrl'
      templateUrl: 'app/login/login.html'
    )
  ])
.controller( 'LoginCtrl', ['$scope', '$location', ($scope, $location) ->
  $scope.username = ''
  $scope.password = ''
  $scope.signIn = ->
    if $scope.username is 'Fabian' and $scope.password is 'password'
      $location.path('home')
])

