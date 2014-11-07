# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
window.app
.directive('ngVisible', [
    ->
      {
      restrict: 'A',
      multiElement: true,
      link: (scope, element, attr) ->
        scope.$watch(attr.ngVisible, (value) ->
          el = angular.element(element)
          el[if value then 'removeClass' else 'addClass']('ng-invisible')
        )
      }
  ])