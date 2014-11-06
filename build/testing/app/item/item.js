(function() {
  window.app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/item', {
        controller: 'ItemCtrl',
        templateUrl: 'app/item/item.html'
      }).when('/item/:itemId', {
        controller: 'ItemCtrl',
        templateUrl: 'app/item/item.html'
      });
    }
  ]).controller('ItemCtrl', [
    '$scope', '$location', function($scope, $location) {
      var decimal;
      decimal = 10000;
      $scope.dimensions = {
        imperial: false,
        length: '',
        width: '',
        height: '',
        weight: '',
        volume: '',
        perVolume: '∞',
        perWeight: '∞',
        pallet: {
          length: '1.2',
          width: '1',
          height: '0.14',
          actualHeight: '',
          actualWeight: '',
          weight: '13',
          tier: '',
          high: '',
          itemsPer: ''
        },
        calculateVolume: function() {
          var actualCubic, cubic, height, length, width;
          length = parseFloat($scope.dimensions.length);
          width = parseFloat($scope.dimensions.width);
          height = parseFloat($scope.dimensions.height);
          if (isNaN(length) || isNaN(width) || isNaN(height)) {
            return '';
          }
          if (length <= 0 || width <= 0 || height <= 0) {
            return '';
          }
          $scope.dimensions.calculatePerVolume(length, width, height);
          actualCubic = length * width * height;
          actualCubic = ($scope.dimensions.imperial ? actualCubic / (12 * 12 * 12) : actualCubic / (100 * 100 * 100));
          if (cubic < 1 / decimal) {
            $scope.dimensions.volume = "< " + (1 / decimal);
            return;
          }
          cubic = Math.floor(actualCubic * decimal) / decimal;
          if (cubic < 1 / decimal) {
            $scope.dimensions.volume = "< " + (1 / decimal);
            return;
          }
          return $scope.dimensions.volume = cubic.toString();
        },
        calculatePerVolume: function(length, width, height) {
          var cubic;
          if ($scope.dimensions.imperial) {
            length = length / 12;
            height = height / 12;
            width = width / 12;
          } else {
            length = length / 100;
            height = height / 100;
            width = width / 100;
          }
          length = 1 / length;
          height = 1 / height;
          width = 1 / width;
          cubic = length * width * height;
          return $scope.dimensions.perVolume = (Math.floor(cubic * decimal) / decimal).toString();
        },
        calculatePerWeight: function() {
          var weight;
          weight = $scope.dimensions.weight;
          if (!weight) {
            $scope.dimensions.perWeight = '∞';
            return;
          }
          weight = parseFloat(weight);
          if (isNaN(weight) || weight <= 0) {
            $scope.dimensions.perWeight = '∞';
            return;
          }
          weight = 1 / weight;
          if (isNaN(weight) || weight <= 0) {
            $scope.dimensions.perWeight = '∞';
            return;
          }
          weight = Math.floor(weight * decimal) / decimal;
          if (weight < 1 / decimal) {
            $scope.dimensions.perWeight = "< " + (1 / decimal);
            return;
          }
          return $scope.dimensions.perWeight = weight.toString();
        },
        calculatePalletHeight: function() {
          var height, high, palletHeight;
          height = $scope.dimensions.height;
          palletHeight = $scope.dimensions.pallet.height;
          high = $scope.dimensions.pallet.high;
          height = parseFloat(height);
          palletHeight = parseFloat(palletHeight);
          high = parseFloat(high);
          if (isNaN(height) || isNaN(palletHeight) || isNaN(high)) {
            if (!isNaN(palletHeight)) {
              $scope.dimensions.pallet.actualHeight = palletHeight;
              return;
            }
            $scope.dimensions.pallet.actualHeight = '';
            return;
          }
          if (height <= 0 || palletHeight <= 0 || high <= 0) {
            if (palletHeight > 0) {
              $scope.dimensions.pallet.actualHeight = palletHeight;
              return;
            }
            $scope.dimensions.pallet.actualHeight = '';
            return;
          }
          palletHeight += high * ($scope.dimensions.imperial ? height / 12 : height / 100);
          palletHeight = Math.floor(palletHeight * decimal) / decimal;
          return $scope.dimensions.pallet.actualHeight = palletHeight.toString();
        },
        calculatePalletWeight: function() {
          var items, palletWeight, weight;
          $scope.dimensions.calculatePalletItems();
          items = $scope.dimensions.pallet.itemsPer;
          palletWeight = $scope.dimensions.pallet.weight;
          weight = $scope.dimensions.weight;
          items = parseFloat(items);
          palletWeight = parseFloat(palletWeight);
          weight = parseFloat(weight);
          if (isNaN(palletWeight) || palletWeight < 0) {
            palletWeight = 0;
          }
          if (isNaN(items) || isNaN(weight)) {
            if (palletWeight > 0) {
              $scope.dimensions.pallet.actualWeight = palletWeight.toString();
              return;
            }
            $scope.dimensions.pallet.actualWeight = '';
            return;
          }
          if (items <= 0 || weight <= 0) {
            if (palletWeight > 0) {
              $scope.dimensions.pallet.actualWeight = palletWeight.toString();
              return;
            }
            $scope.dimensions.pallet.actualWeight = '';
            return;
          }
          weight *= items;
          weight += palletWeight;
          weight = Math.floor(weight * decimal) / decimal;
          return $scope.dimensions.pallet.actualWeight = weight.toString();
        },
        calculatePalletItems: function() {
          var high, per, tier;
          high = $scope.dimensions.pallet.high;
          tier = $scope.dimensions.pallet.tier;
          high = parseFloat(high);
          tier = parseFloat(tier);
          if (isNaN(high) || isNaN(tier)) {
            $scope.dimensions.pallet.itemsPer = '';
            return;
          }
          if (high <= 0 || tier <= 0) {
            $scope.dimensions.pallet.itemsPer = '';
            return;
          }
          per = Math.floor(high * tier);
          return $scope.dimensions.pallet.itemsPer = per.toString();
        },
        setDefaultPallet: function() {
          if (!$scope.dimensions.imperial) {
            if ($scope.dimensions.pallet.width !== '3.28084') {
              $scope.dimensions.calculatePalletHeight();
              return;
            }
            if ($scope.dimensions.pallet.height !== '0.4593176') {
              $scope.dimensions.calculatePalletHeight();
              return;
            }
            if ($scope.dimensions.pallet.length !== '3.93701') {
              $scope.dimensions.calculatePalletHeight();
              return;
            }
            $scope.dimensions.pallet.width = '1';
            $scope.dimensions.pallet.height = '0.14';
            $scope.dimensions.pallet.length = '1.2';
            if ($scope.dimensions.pallet.weight === '30') {
              $scope.dimensions.pallet.weight = '13';
            }
          } else {
            if ($scope.dimensions.pallet.width !== '1') {
              $scope.dimensions.calculatePalletHeight();
              return;
            }
            if ($scope.dimensions.pallet.height !== '0.14') {
              $scope.dimensions.calculatePalletHeight();
              return;
            }
            if ($scope.dimensions.pallet.length !== '1.2') {
              $scope.dimensions.calculatePalletHeight();
              return;
            }
            $scope.dimensions.pallet.width = '3.28084';
            $scope.dimensions.pallet.height = '0.4593176';
            $scope.dimensions.pallet.length = '3.93701';
            if ($scope.dimensions.pallet.weight === '13') {
              $scope.dimensions.pallet.weight = '30';
            }
          }
          return $scope.dimensions.calculatePalletHeight();
        },
        setup: function() {
          $scope.$watch(function() {
            return $scope.dimensions.imperial;
          }, $scope.dimensions.calculateVolume);
          $scope.$watch(function() {
            return $scope.dimensions.imperial;
          }, $scope.dimensions.setDefaultPallet);
          $scope.$watch(function() {
            return $scope.dimensions.length;
          }, $scope.dimensions.calculateVolume);
          $scope.$watch(function() {
            return $scope.dimensions.width;
          }, $scope.dimensions.calculateVolume);
          $scope.$watch(function() {
            return $scope.dimensions.height;
          }, $scope.dimensions.calculateVolume);
          $scope.$watch(function() {
            return $scope.dimensions.height;
          }, $scope.dimensions.calculatePalletHeight);
          $scope.$watch(function() {
            return $scope.dimensions.pallet.high;
          }, $scope.dimensions.calculatePalletHeight);
          $scope.$watch(function() {
            return $scope.dimensions.pallet.height;
          }, $scope.dimensions.calculatePalletHeight);
          $scope.$watch(function() {
            return $scope.dimensions.weight;
          }, $scope.dimensions.calculatePerWeight);
          $scope.$watch(function() {
            return $scope.dimensions.pallet.high;
          }, $scope.dimensions.calculatePalletItems);
          $scope.$watch(function() {
            return $scope.dimensions.pallet.tier;
          }, $scope.dimensions.calculatePalletItems);
          $scope.$watch(function() {
            return $scope.dimensions.weight;
          }, $scope.dimensions.calculatePalletWeight);
          $scope.$watch(function() {
            return $scope.dimensions.pallet.weight;
          }, $scope.dimensions.calculatePalletWeight);
          $scope.$watch(function() {
            return $scope.dimensions.pallet.high;
          }, $scope.dimensions.calculatePalletWeight);
          return $scope.$watch(function() {
            return $scope.dimensions.pallet.tier;
          }, $scope.dimensions.calculatePalletWeight);
        }
      };
      $scope.dimensions.setup();
      return $scope.general = {};
    }
  ]);

}).call(this);
