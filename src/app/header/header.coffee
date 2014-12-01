# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
window.app
.controller('HeaderCtrl', ['$scope', '$timeout', '$location', 'AuthService', ($scope, $timeout, $location, AuthService)->
  $scope.search = no

  $scope.enableMenu = yes

  $scope.enableSearch = no

  $scope.$on('enable-search', ->
    $scope.enableSearch = AuthService.isAuthenticated()
  )

  $scope.$on('$routeChangeStart', (next) ->
    $scope.enableSearch = no

  )
  $scope.$on('$routeChangeSuccess', (next) ->
    if $location.path() is 'home' or $location.path() is '/home'
      $scope.enableMenu = no
    else
      $scope.enableMenu = AuthService.isAuthenticated()
  )
  $scope.exitSearch = ->
    $scope.search = no
    $scope.term = ''

  $scope.titleClick = ->
    if $scope.search
      $scope.exitSearch()
      return
  $scope.menuClick = ->
    if $scope.search
      $scope.exitSearch()
      return
    $scope.showMenu = not $scope.showMenu
    body = angular.element('body')
    body[if $scope.showMenu then 'addClass' else 'removeClass']('menu-visible')
    return
  $scope.hideMenu = ->
    $scope.showMenu = no
    body = angular.element('body')
    body.removeClass('menu-visible')
    return

  $scope.searchClick = ->
    $scope.search = yes
    $scope.hideMenu()

  $scope.term = ''
  $scope.searchLoading = no

  $scope.termChange = ->
    $scope.items = []
    $scope.searchLoading = yes
    $timeout(->
      countries = getCountryList()
      items = []
      for country in countries
        if not country
          continue
        if not country.header or not country.subheader
          continue
        items.push(
          "#{country.header}, #{country.subheader}"
        )
      $scope.items = items
      $scope.searchLoading = no
    , Math.floor(Math.random() * 1500)
    )

  angular.element('#search-content').on('click', (event) ->
    element = angular.element(event.target)
    if not element
      return
    if element.is("#search-content")
      $scope.exitSearch()
    $scope.$apply()
  )

  $scope.goto = (route) ->
    $scope.showMenu = no
    $location.path(route)

])