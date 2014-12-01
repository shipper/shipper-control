(function() {
  var AuthService;

  AuthService = function($http, env, Session, $q) {
    var self;
    return self = {
      $Session: Session,
      login: function(credentials) {
        var deferred;
        deferred = $q.defer();
        $http.post("" + env.api + "/agent/login", credentials).success(function(data) {
          Session.create(data.token, data.user);
          return deferred.resolve(data.user);
        }).error(deferred.reject);
        return deferred.promise;
      },
      isAuthenticated: function() {
        return !!Session.token;
      },
      isAuthorized: function(roles) {
        if (!_.isArray(roles)) {
          roles = [roles];
        }
        return self.isAuthenticated() && roles.indexOf(Session.user.role);
      }
    };
  };

  AuthService.$inject = ['$http', 'env', 'Session', '$q'];

  angular.module("ngShipper").factory('AuthService', AuthService);

}).call(this);
