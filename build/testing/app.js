(function(){window.app=angular.module("ngShipper",["ngMaterial","ngRoute"]).controller("AppCtrl",[function(){}])}).call(this),function(){}.call(this),function(){window.app.config(["$routeProvider",function(o){return o.when("/home",{controller:"HomeCtrl",templateUrl:"app/home/home.html"})}]).controller("HomeCtrl",["$scope",function(){}])}.call(this),function(){window.app.config(["$routeProvider",function(o){return o.when("/login",{controller:"LoginCtrl",templateUrl:"app/login/login.html"})}]).controller("LoginCtrl",["$scope","$location",function(o,t){return o.username="",o.password="",o.signIn=function(){return"Fabian"===o.username&&"password"===o.password?t.path("home"):void 0}}])}.call(this),function(){window.app.config(["$routeProvider",function(o){return o.when("/product",{controller:"ProductCtrl",templateUrl:"app/product/product.html"}).when("/product/:productId",{controller:"ProductCtrl",templateUrl:"app/product/product.html"})}]).controller("ProductCtrl",["$scope","$location",function(){}])}.call(this);