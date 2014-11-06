# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
window.app
.directive('mdRequired', [
    ->
      {
      require: 'ngModel'
      link: (scope, element, attrs, ngModel) ->
        hadValue = no
        scope.$watch(->
          ngModel.$modelValue
        , (value) ->
          if not value and typeof value isnt 'number'
            if hadValue
              element.addClass('md-warn')
            return
          hadValue = yes
          element.removeClass('md-warn')
        )
      }
  ])