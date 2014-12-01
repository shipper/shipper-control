(function() {
  var Session;

  Session = function() {
    var lastToken;
    lastToken = localStorage.getItem("token");
    this.dirty = !!lastToken;
    this.lastToken = lastToken;
    this.create = function(token, user) {
      localStorage.setItem("token", token);
      this.dirty = false;
      this.token = token;
      return this.user = user;
    };
    this.destroy = function() {
      localStorage.setItem("token", null);
      this.token = null;
      return this.user = null;
    };
    return this;
  };

  angular.module("ngShipper").service('Session', Session);

}).call(this);
