(function() {
  var $dataFactory, definition, definitions, getDefinition, index, indexIndex, indexVal, indexValue, key, keyIndex, keys, name, parsed, path, val, _i, _j, _k, _len, _len1, _len2, _ref;

  definitions = [[], ["AdHocItem", "Address", "Consumer", "Country", "Date", "Facility", "Group", "ISO3166_1", "ISO3166_2", "Item", "ItemGrouping", "ItemPallet", "ItemVariation", "ItemVariationProperty", "Measurement", "Note", "OrderItem", "SendOrder", "SerialScan", "StoreOrder", "User"]];

  getDefinition = function(name) {
    var definition;
    if (!"databaseSchema" in window) {
      return;
    }
    if (!"schema" in window.databaseSchema) {
      return;
    }
    if (!"definitions" in window.databaseSchema.schema) {
      return;
    }
    definition = window.databaseSchema.schema.definitions[name];
    if (!definition) {
      return;
    }
    return definition;
  };

  parsed = {};

  index = 0;

  for (_i = 0, _len = definitions.length; _i < _len; _i++) {
    keys = definitions[_i];
    keyIndex = 0;
    for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
      key = keys[_j];
      val = {};
      if (key instanceof Object) {
        val = {
          name: key.name,
          keyPath: key.keyPath || "$$key",
          indexes: _.cloneDeep(key.indexes) || []
        };
      } else {
        val = {
          name: key,
          keyPath: "$$key",
          indexes: []
        };
      }
      indexIndex = 0;
      _ref = val.indexes;
      for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
        indexValue = _ref[_k];
        indexVal = {};
        if (indexValue instanceof Object) {
          path = indexValue.path;
          name = null;
          if (!path) {
            path = indexValue.name;
            name = "" + path + "_index";
          } else {
            name = indexValue.name;
          }
          indexVal = {
            name: name,
            path: path,
            unique: indexValue.unique || false
          };
        } else {
          indexVal = {
            name: "" + indexValue + "_index",
            path: indexValue,
            unique: false
          };
        }
        val.indexes[indexIndex] = indexVal;
        indexIndex++;
      }
      definition = getDefinition(val.name);
      if (definition) {
        val.$definition = definition;
      }
      parsed[val.name] = val;
      definitions[index][keyIndex] = val;
      keyIndex++;
    }
    index++;
  }

  window.$$parsedDatabaseDefinition = parsed;

  window.$$databaseDefinitions = definitions;

  $dataFactory = function($q, $indexedDB, rfc4122) {
    var DataDefinition, actions, execute, factory, generateMap, getArguments;
    actions = {
      GetAllKeys: {
        method: "getAllKeys",
        fn: function(name, definition, key, value, index) {
          return [];
        }
      },
      Clear: {
        method: "clear",
        fn: function(name, definition, key, value, index) {
          return [];
        }
      },
      Delete: {
        method: "delete",
        fn: function(name, definition, key, value, index) {
          return [key];
        }
      },
      Upsert: {
        method: "upsert",
        insert: true,
        fn: function(name, definition, key, value, index) {
          return [value];
        }
      },
      Insert: {
        method: "insert",
        insert: true,
        fn: function(name, definition, key, value, index) {
          return [value];
        }
      },
      GetAll: {
        method: "getAll",
        fn: function(name, definition, key, value, index) {
          return [];
        }
      },
      Count: {
        method: "count",
        fn: function(name, definition, key, value, index) {
          return [];
        }
      },
      Find: {
        method: "find",
        fn: function(name, definition, key, value, index) {
          return [key];
        }
      },
      FindBy: {
        method: "findBy",
        fn: function(name, definition, key, value, index) {
          return [index.name, index.value];
        }
      },
      Each: {
        method: "each",
        implemented: false,
        fn: function(name, definition, key, value, index) {
          return [];
        }
      },
      EachBy: {
        method: "eachBy",
        implemented: false,
        fn: function(name, definition, key, value, index) {
          return [];
        }
      },
      EachWhere: {
        method: "eachWhere",
        implemented: false,
        fn: function(name, definition, key, value, index) {
          return [];
        }
      },
      FindWhere: {
        method: "findWhere",
        implemented: false,
        fn: function(name, definition, key, value, index) {
          return [];
        }
      },
      Query: {
        method: "query",
        implemented: false,
        fn: function(name, definition, key, value, index) {
          return [];
        }
      }
    };
    getArguments = function(action, name, definition, key, value, index) {
      var i, keyPath, _l, _len3, _ref1;
      if (key instanceof Object) {
        value = key;
        key = null;
      }
      keyPath = definition.keyPath;
      if (index) {
        _ref1 = definition.indexes;
        for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
          i = _ref1[_l];
          i.$$index = true;
          if (i === index) {
            keyPath = i.path;
            index = i;
            break;
          }
          if (i.name === index) {
            keyPath = i.path;
            index = i;
            break;
          }
          if (i.path === index) {
            keyPath = i.path;
            index = i;
            break;
          }
        }
        if (index.$$index) {
          index = _.cloneDeep(index);
        }
      }
      if (!key && value instanceof Object) {
        if (value[definition.keyPath]) {
          key = value[definition.keyPath];
        }
      }
      if (!value) {
        value = {};
      }
      if (index && index.$$index) {
        if (value instanceof Object) {
          index.value = value[index.path];
        } else if (!value) {
          index.value = key;
        } else {
          index.value = value;
        }
      }
      if (!key) {
        key = rfc4122.v4();
      }
      if (value instanceof Object) {
        value[definition.keyPath] = key;
      }
      if (action.fn instanceof Function) {
        return action.fn(name, definition, key, value, index);
      }
    };
    execute = function(action, name, key, value, index) {
      var actionKey, actualAction, args, deferred;
      if (!action) {
        return $q.reject("No action defined");
      }
      actualAction = null;
      for (actionKey in actions) {
        if (!actions.hasOwnProperty(actionKey)) {
          continue;
        }
        if (action === actionKey) {
          actualAction = actions[actionKey];
          actualAction.key = actionKey;
          break;
        }
        if (action === actions[actionKey]) {
          actualAction = actions[actionKey];
          actualAction.key = actionKey;
          break;
        }
      }
      if (!actualAction) {
        return $q.reject("No action " + (JSON.stringify(action)));
      }
      action = actualAction;
      if (action.implemented === false) {
        return $q.reject("The action " + action.key + " is not yet implemented");
      }
      if (!name) {
        return $q.reject("Object store required");
      }
      definition = parsed[name];
      if (!definition) {
        return $q.reject("Object store '" + name + "' doesn't exist");
      }
      args = getArguments(action, name, definition, key, value, index);
      deferred = $q.defer();
      $indexedDB.openStore(name, function(store) {
        return store[action.method].apply(store, args).then(deferred.resolve, deferred.reject);
      });
      return deferred.promise;
    };
    DataDefinition = (function() {
      DataDefinition.prototype.$definition = null;

      DataDefinition.prototype.$key = null;

      function DataDefinition(key, definition) {
        var def, functionKey, resultFunction, _fn;
        this.$key = key;
        this.$definition = definition;
        def = this;
        resultFunction = function() {
          return def.get.apply(def, arguments);
        };
        _fn = function(r, f, d) {
          return r[f] = function() {
            return d[f].apply(d, arguments);
          };
        };
        for (functionKey in DataDefinition.prototype) {
          if (!DataDefinition.prototype.hasOwnProperty(functionKey)) {
            continue;
          }
          if (!(this[functionKey] instanceof Function)) {
            continue;
          }
          if (functionKey === "constructor") {
            continue;
          }
          if (functionKey === "get") {
            continue;
          }
          _fn(resultFunction, functionKey, this);
        }
        return resultFunction;
      }

      DataDefinition.prototype.get = function(keyOrValue) {
        return factory.get(this.$key, keyOrValue);
      };

      DataDefinition.prototype.index = function(name, value) {
        return factory.getBy(this.$key, name, value);
      };

      DataDefinition.prototype.put = function(value) {
        return factory.put(this.$key, value);
      };

      DataDefinition.prototype.remove = function(keyOrValue) {
        return factory.count(this.$key, keyOrValue);
      };

      DataDefinition.prototype.count = function() {
        return factory.count(this.$key);
      };

      DataDefinition.prototype.getAll = function() {
        return factory.getAll(this.$key);
      };

      DataDefinition.prototype.getAllKeys = function() {
        return factory.getAllKeys(this.$key);
      };

      DataDefinition.prototype.clear = function() {
        return factory.clear(this.$key);
      };

      return DataDefinition;

    })();
    generateMap = function() {
      var map;
      map = {};
      for (key in parsed) {
        if (!parsed.hasOwnProperty(key)) {
          continue;
        }
        map[key] = new DataDefinition(key, parsed[key]);
      }
      return map;
    };
    factory = {
      map: generateMap(),
      getBy: function(name, index, key) {
        return execute(actions.FindBy, name, key, null, index);
      },
      get: function(name, keyOrValue) {
        return execute(actions.Find, name, keyOrValue);
      },
      put: function(name, key, value) {
        return execute(actions.Upsert, name, key, value);
      },
      remove: function(name, keyOrValue) {
        return execute(actions.Delete, name, keyOrValue);
      },
      count: function(name) {
        return execute(actions.Count, name);
      },
      getAll: function(name) {
        return execute(actions.GetAll, name);
      },
      getAllKeys: function(name) {
        return execute(actions.GetAllKeys, name);
      },
      clear: function(name) {
        return execute(actions.Clear, name);
      }
    };
    return factory;
  };

  window.app.config([
    "$indexedDBProvider", function($indexedDBProvider) {
      var connection, upgrade, version, _l, _len3, _results;
      connection = $indexedDBProvider.connection('ngShipper.Database');
      upgrade = function(version, keys) {
        connection.upgradeDatabase(version, function(event, db, tx) {
          var store, _l, _len3, _results;
          _results = [];
          for (_l = 0, _len3 = keys.length; _l < _len3; _l++) {
            key = keys[_l];
            store = db.createObjectStore(key.name, {
              keyPath: key.keyPath
            });
            _results.push((function() {
              var _results1;
              _results1 = [];
              for (index in key.indexes) {
                _results1.push(store.createIndex(index.name, index.path, {
                  unique: index.unique
                }));
              }
              return _results1;
            })());
          }
          return _results;
        });
        return this;
      };
      version = 1;
      _results = [];
      for (_l = 0, _len3 = definitions.length; _l < _len3; _l++) {
        keys = definitions[_l];
        upgrade(version, keys);
        _results.push(version += 1);
      }
      return _results;
    }
  ]).factory("$data", ['$q', '$indexedDB', 'rfc4122', $dataFactory]);

}).call(this);
