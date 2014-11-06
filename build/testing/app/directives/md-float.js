(function() {
  window.app.directive('mdFloat', [
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
            if (typeof value === 'number') {
              value = value.toString();
            }
            if (/^[-+]?[0-9]*\.?[0-9]*$/.test(value.trim())) {
              return element.removeClass('md-warn');
            } else {
              return element.addClass('md-warn');
            }
          });
        }
      };
    }
  ]);

}).call(this);
