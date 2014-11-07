(function() {
  window.app.directive('ngVisible', [
    function() {
      return {
        restrict: 'A',
        multiElement: true,
        link: function(scope, element, attr) {
          return scope.$watch(attr.ngVisible, function(value) {
            var el;
            el = angular.element(element);
            return el[value ? 'removeClass' : 'addClass']('ng-invisible');
          });
        }
      };
    }
  ]);

}).call(this);
