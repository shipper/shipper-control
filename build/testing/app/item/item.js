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
        perCapacity: '∞',
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
          if (weight < 1 / decimal) {
            $scope.dimensions.perWeight = "< " + (1 / decimal);
            return;
          }
          weight = Math.floor(weight * decimal) / decimal;
          return $scope.dimensions.perWeight = weight.toString();
        },
        calculatePerCapacity: function() {
          var capacity;
          capacity = $scope.dimensions.capacity;
          if (!capacity) {
            $scope.dimensions.perCapacity = '∞';
            return;
          }
          capacity = parseFloat(capacity);
          if (isNaN(capacity) || capacity <= 0) {
            $scope.dimensions.perCapacity = '∞';
            return;
          }
          capacity = 1 / capacity;
          if (isNaN(capacity) || capacity <= 0) {
            $scope.dimensions.perCapacity = '∞';
            return;
          }
          if (capacity < 1 / decimal) {
            $scope.dimensions.perCapacity = "< " + (1 / capacity);
            return;
          }
          capacity = Math.floor(capacity * decimal) / decimal;
          return $scope.dimensions.perCapacity = capacity.toString();
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
            return $scope.dimensions.capacity;
          }, $scope.dimensions.calculatePerCapacity);
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
      $scope.general = {};
      $scope.grouping = {
        items: '1',
        width: '',
        height: '',
        length: '',
        capacity: '',
        volume: '',
        filled: '',
        filledCapacity: '',
        maximum: '',
        calculateVolume: function() {
          var height, length, volume, width;
          length = parseFloat($scope.grouping.length);
          width = parseFloat($scope.grouping.width);
          height = parseFloat($scope.grouping.height);
          if (isNaN(length) || isNaN(width) || isNaN(height)) {
            $scope.grouping.volume = '';
            return;
          }
          if (length <= 0 || width <= 0 || height <= 0) {
            $scope.grouping.volume = '';
            return;
          }
          volume = length * width * height;
          if (volume < 1 / decimal) {
            $scope.grouping.volume = "< " + (1 / decimal);
            return;
          }
          volume = Math.floor(volume * decimal) / decimal;
          return $scope.grouping.volume = volume.toString();
        },
        calculateFilled: function() {
          var filled, height, items, length, maximum, percent, width;
          length = $scope.dimensions.length;
          width = $scope.dimensions.width;
          height = $scope.dimensions.height;
          items = $scope.grouping.items;
          length = parseFloat(length);
          width = parseFloat(width);
          height = parseFloat(height);
          items = parseFloat(items);
          if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(items)) {
            $scope.grouping.filled = '';
            return;
          }
          if (length <= 0 || width <= 0 || height <= 0 || items <= 0) {
            $scope.grouping.filled = '';
            return;
          }
          filled = width * length * height * items;
          filled = Math.floor(filled * decimal) / decimal;
          $scope.grouping.filled = filled.toString();
          maximum = $scope.grouping.maximum;
          maximum = parseFloat(maximum);
          if (isNaN(maximum)) {
            return;
          }
          if (maximum < 1) {
            return;
          }
          percent = filled / maximum * 100;
          percent = Math.floor(percent * decimal) / decimal;
          if (percent <= 0) {
            return;
          }
          return $scope.grouping.filled = $scope.grouping.filled + (" (" + percent + "%)");
        },
        calculateMaximum: function() {
          var item, max;
          max = $scope.grouping.calculateMaximumWithFigures($scope.grouping.length, $scope.grouping.width, $scope.grouping.height, $scope.dimensions.length, $scope.dimensions.width, $scope.dimensions.height);
          if (isNaN(max) || max <= 0) {
            $scope.grouping.maximum = '';
            if ($scope.grouping.capacity && $scope.dimensions.capacity) {
              max = $scope.grouping.capacity;
              item = $scope.dimensions.capacity;
              max = parseFloat(max);
              item = parseFloat(item);
              if (isNaN(max) || isNaN(item)) {
                return;
              }
              if (max <= 0 || item <= 0) {
                return;
              }
              max = max / item;
              max = Math.floor(max);
              $scope.grouping.maximum = max.toString();
            }
            return;
          }
          max = Math.floor(max);
          return $scope.grouping.maximum = max.toString();
        },
        calculateMaximumWithFigures: function(l, w, h, il, iw, ih) {
          var max;
          l = parseFloat(l);
          w = parseFloat(w);
          h = parseFloat(h);
          il = parseFloat(il);
          iw = parseFloat(iw);
          ih = parseFloat(ih);
          if (isNaN(l) || isNaN(w) || isNaN(h)) {
            return NaN;
          }
          if (isNaN(il) || isNaN(iw) || isNaN(ih)) {
            return NaN;
          }
          if (l <= 0 || w <= 0 || h <= 0) {
            return NaN;
          }
          if (il <= 0 || iw <= 0 || ih <= 0) {
            return NaN;
          }
          return max = $scope.grouping.calculateAllCombinations([l, w, h], [il, iw, ih]);
        },
        calculateAllCombinations: function(a, b) {
          var aAll, bAll, i, k, max, res, v, va, val, vb, z, _i, _j, _k, _len, _len1, _len2;
          aAll = [];
          bAll = [];
          i = 0;
          while (i < a.length) {
            res = [];
            k = 0;
            while (k < a.length) {
              z = i + k;
              if (z >= a.length) {
                z -= a.length;
              }
              res.push(a[z]);
              k += 1;
            }
            i += 1;
            aAll.push(res);
          }
          i = 0;
          while (i < b.length) {
            res = [];
            k = 0;
            while (k < b.length) {
              z = i + k;
              if (z >= b.length) {
                z -= b.length;
              }
              res.push(b[z]);
              k += 1;
            }
            i += 1;
            bAll.push(res);
          }
          max = 0;
          for (_i = 0, _len = aAll.length; _i < _len; _i++) {
            va = aAll[_i];
            for (_j = 0, _len1 = bAll.length; _j < _len1; _j++) {
              vb = bAll[_j];
              v = [];
              i = 0;
              while (i < va.length && i < vb.length) {
                v.push(va[i] / vb[i]);
                i++;
              }
              val = null;
              for (_k = 0, _len2 = v.length; _k < _len2; _k++) {
                k = v[_k];
                if (val === null) {
                  val = k;
                  continue;
                }
                val *= k;
              }
              if (val > max) {
                max = val;
              }
            }
          }
          if (max <= 0) {
            return 0;
          }
          return max;
        },
        setup: function() {
          $scope.$watch(function() {
            return $scope.grouping.length;
          }, $scope.grouping.calculateVolume);
          $scope.$watch(function() {
            return $scope.grouping.width;
          }, $scope.grouping.calculateVolume);
          $scope.$watch(function() {
            return $scope.grouping.height;
          }, $scope.grouping.calculateVolume);
          $scope.$watch(function() {
            return $scope.grouping.length;
          }, $scope.grouping.calculateMaximum);
          $scope.$watch(function() {
            return $scope.grouping.width;
          }, $scope.grouping.calculateMaximum);
          $scope.$watch(function() {
            return $scope.grouping.height;
          }, $scope.grouping.calculateMaximum);
          $scope.$watch(function() {
            return $scope.grouping.capacity;
          }, $scope.grouping.calculateMaximum);
          $scope.$watch(function() {
            return $scope.grouping.items;
          }, $scope.grouping.calculateFilled);
          $scope.$watch(function() {
            return $scope.grouping.volume;
          }, $scope.grouping.calculateFilled);
          return $scope.$watch(function() {
            return $scope.grouping.maximum;
          }, $scope.grouping.calculateFilled);
        },
        selected: function() {
          $scope.grouping.calculateVolume();
          $scope.grouping.calculateMaximum();
          return $scope.grouping.calculateFilled();
        }
      };
      $scope.grouping.setup();
      return $scope.variations = {
        sku: '',
        description: '',
        variations: [],
        add: function() {
          $scope.variations.variations.push({
            sku: $scope.variations.sku,
            description: $scope.variations.description
          });
          $scope.variations.sku = '';
          return $scope.variations.description = '';
        }
      };
    }
  ]);

}).call(this);
