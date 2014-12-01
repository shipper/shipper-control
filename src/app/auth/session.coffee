Session = ->
  lastToken = localStorage.getItem("token")
  this.dirty = !!lastToken
  this.lastToken = lastToken
  this.create = (token, user) ->
    localStorage.setItem("token", token)
    this.dirty = false
    this.token = token
    this.user = user
  this.destroy = ->
    localStorage.setItem("token", null)
    this.token = null
    this.user = null
  return this

angular.module("ngShipper")
.service('Session', Session)