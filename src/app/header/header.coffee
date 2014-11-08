# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
window.app
.controller('HeaderCtrl', ['$scope', '$timeout', ($scope, $timeout)->
  $scope.search = no

  $scope.enableSearch = no

  $scope.$on('enable-search', ->
    $scope.enableSearch = yes
  )

  $scope.$on('$routeChangeStart', ->
    $scope.enableSearch = no
  );

  $scope.exitSearch = ->
    $scope.search = no
    $scope.term = ''
    console.log('exit search')

  $scope.titleClick = ->
    if $scope.search
      $scope.exitSearch()
      return
  $scope.menuClick = ->
    if $scope.search
      $scope.exitSearch()
      return
  $scope.searchClick = ->
    $scope.search = yes
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

  angular.element('.search-content').on('click', (event) ->
    element = angular.element(event.target)
    if not element
      return
    if element.is("#search-content")
      $scope.exitSearch()
    $scope.$apply()
  )
])