(function() {
  window.app.directive('mdRequired', [
    function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          var hadValue;
          hadValue = false;
          return scope.$watch(function() {
            return ngModel.$modelValue;
          }, function(value) {
            if (!value && typeof value !== 'number') {
              if (hadValue) {
                element.addClass('md-warn');
              }
              return;
            }
            hadValue = true;
            return element.removeClass('md-warn');
          });
        }
      };
    }
  ]);

}).call(this);
