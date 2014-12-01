LoginCtrl = ( $scope, $location, AuthService, $mdDialog ) ->

  if AuthService.isAuthenticated()
    $location.path('/home')
    return

  if AuthService.$Session.dirty
    alert = $mdDialog.alert()
      .title("Attempting to restore previous session")
    dialog = $mdDialog.show(
      alert
    )

  $scope.username = ''
  $scope.password = ''
  $scope.error = no
  $scope.signIn = ->
    $scope.error = no
    AuthService.login(
      username: $scope.username
      password: $scope.password
    )
    .then( ->
      $scope.username = ''
      $scope.password = ''
      $location.path("/home")
    )
    .fail( ->
      $scope.password = ''
      $scope.error = yes
    )



LoginCtrl.$inject = ['$scope', '$location', 'AuthService', '$mdDialog' ]
angular.module("ngShipper")
.config(['$routeProvider', ($routeProvider) ->
    $routeProvider
    .when('/login',
      controller: 'LoginCtrl'
      templateUrl: 'app/login/login.html'
      data: {
        anonymous: true
      }
    )
  ])
.controller( 'LoginCtrl', LoginCtrl)

