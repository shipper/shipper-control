AuthService = ( $http, env, Session, $q ) ->
  self =
    $Session: Session
    login: ( credentials ) ->
      deferred = $q.defer()
      $http.post("#{env.api}/agent/login", credentials)
      .success((data) ->
        Session.create(data.token, data.user)
        deferred.resolve(data.user)
      )
      .error(deferred.reject)
      return deferred.promise
    isAuthenticated: ->
      return !!Session.token
    isAuthorized: (roles) ->
      if not _.isArray(roles)
        roles = [ roles ]
      return self.isAuthenticated() &&
          roles.indexOf(Session.user.role)

AuthService.$inject = [ '$http', 'env', 'Session', '$q' ]

angular.module("ngShipper")
.factory('AuthService', AuthService)