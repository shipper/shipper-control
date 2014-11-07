# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
window.app = angular.module('ngShipper', [
  'ngMaterial'
  'ngRoute'
  'angular-inview'
])
.controller('AppCtrl', [
    '$scope',
    ($scope) ->

      $scope.$on('$routeChangeStart', ->
        $scope.hideNav = no
      );

      $scope.$on('hide-nav', ->
        $scope.hideNav = yes
      )
      $scope.$on('show-nav', ->
        $scope.hideNav = no
      )

])