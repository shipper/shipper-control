# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
window.app
.directive('mdInt', [
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
            if typeof value is 'number'
              value = value.toString()
            hadValue = yes
            if /^[-+]?\d+$/.test(value.trim())
              element.removeClass('md-warn')
            else
              element.addClass('md-warn')
          )
      }
  ])