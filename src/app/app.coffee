# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14

parseLocation = (location) ->
  pairs = location.substring(1).split("&")
  obj = {}
  pair = null
  i  = null

  for i in pairs
    if i is ""
      continue
    pair = i.split("=")
    obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] )
  return obj
window.QueryString = parseLocation(window.location.search)

window.app = angular.module('ngShipper', [
  'ngMaterial'
  'ngRoute'
  'angular-inview'
  'indexedDB'
  'uuid'
])
.controller('AppCtrl', [
    '$scope',
    '$location',
    'AuthService'
    ($scope, $location, AuthService) ->

      $scope.isAuthorized = AuthService.isAuthorized
      $scope.isAuthenticated = AuthService.isAuthenticated



      $scope.$on('$routeChangeStart', (event, route) ->
        $scope.hideNav = no
        data = route.$$route.data or {}
        if not $scope.isAuthenticated() and not data.anonymous
          $location.path("/login")
      )

      $scope.$on('$locationChangeSuccess', ->

        console.log($location.absUrl())
        console.log($location.search())

      )
      $scope.$on('hide-nav', ->
        $scope.hideNav = yes
      )
      $scope.$on('show-nav', ->
        $scope.hideNav = no
      )
])