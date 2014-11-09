# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14

definitions = [
  #1
  []
  #2
  [
    "AdHocItem",
    "Address",
    "Consumer",
    "Country",
    "Date",
    "Facility",
    "Group",
    "ISO3166_1",
    "ISO3166_2",
    "Item",
    "ItemGrouping",
    "ItemPallet",
    "ItemVariation",
    "ItemVariationProperty",
    "Measurement",
    "Note",
    "OrderItem",
    "SendOrder",
    "SerialScan",
    "StoreOrder",
    "User"
  ]
]

getDefinition = (name) ->
  if not "databaseSchema" of window
    return
  if not "schema" of window.databaseSchema
    return
  if not "definitions" of window.databaseSchema.schema
    return
  definition = window.databaseSchema.schema.definitions[name]
  if not definition
    return
  return definition

parsed = {}
index = 0
for keys in definitions
  keyIndex = 0
  for key in keys
    val = {}
    if key instanceof Object
      val = {
        name: key.name
        keyPath: key.keyPath or "$$key"
        indexes: _.cloneDeep(key.indexes) or []
      }
    else
      val = {
        name: key
        keyPath: "$$key"
        indexes: []
      }
    indexIndex = 0
    for indexValue in val.indexes
      indexVal = {}
      if indexValue instanceof Object
        path = indexValue.path
        name = null
        if not path
          path = indexValue.name
          name = "#{path}_index"
        else
          name = indexValue.name
        indexVal = {
          name: name
          path: path
          unique: indexValue.unique or no
        }
      else
        indexVal = {
          name: "#{indexValue}_index"
          path: indexValue
          unique: no
        }
      val.indexes[indexIndex] = indexVal
      indexIndex++

    definition = getDefinition(val.name)
    if definition
      val.$definition = definition
    parsed[val.name] = val
    definitions[index][keyIndex] = val
    keyIndex++
  index++

window.$$parsedDatabaseDefinition = parsed
window.$$databaseDefinitions = definitions

$dataFactory = ($q, $indexedDB, rfc4122) ->

  actions = {
    GetAllKeys: {
      method: "getAllKeys"
      #description: "Returns all the primary keys on the store"
      fn: (name, definition, key, value, index) ->
        return []
    }
    Clear: {
      method: "clear"
      #description: "Deletes all items from the store"
      fn: (name, definition, key, value, index) ->
        return []
    }
    Delete: {
      method: "delete"
      #description: "Deletes a single item from the store"
      fn: (name, definition, key, value, index) ->
        return [key]
    }
    Upsert: {
      method: "upsert"
      #description: "Upserts an item or list of items in the store"
      insert: yes
      fn: (name, definition, key, value, index) ->
        return [value]
    }
    Insert: {
      method: "insert"
      #description: "Inserts an item or list of items in the store"
      insert: yes
      fn: (name, definition, key, value, index) ->
        return [value]
    }
    GetAll: {
      method: "getAll"
    #description: "Returns all items in the store"
      fn: (name, definition, key, value, index) ->
        return []
    }
    Count: {
      method: "count"
    #description: "Returns a count of all the items"
      fn: (name, definition, key, value, index) ->
        return []
    }
    Find: {
      method: "find"
    #description: "Returns a single item from the store"
      fn: (name, definition, key, value, index) ->
        return [key]
    }
    FindBy: {
      method: "findBy"
      #description: "Searches a particular index for an item"
      fn: (name, definition, key, value, index) ->
        return [index.name, index.value]
    }
    Each: {
      method: "each"
      #description: "Iterates over all items in the store"
      implemented: no
      fn: (name, definition, key, value, index) ->
        return []
    }
    EachBy: {
      method: "eachBy"
      #description: "Iterates over all items in the store using a named index."
      implemented: no
      fn: (name, definition, key, value, index) ->
        return []
    }
    EachWhere: {
      method: "eachWhere"
      #description: "Uses the query() to execute a find against the store"
      implemented: no
      fn: (name, definition, key, value, index) ->
        return []
    }
    FindWhere: {
      method: "findWhere"
      #description: "An alias for eachWhere"
      implemented: no
      fn: (name, definition, key, value, index) ->
        return []
    }
    Query: {
      method: "query"
      #description: "Builds a new query object for use against eachWhere"
      implemented: no
      fn: (name, definition, key, value, index) ->
        return []
    }
  }

  getArguments = (action, name, definition, key, value, index) ->
    if key instanceof Object
      value = key
      key = null
    keyPath = definition.keyPath
    if index
      for i in definition.indexes
        i.$$index = true
        if i is index
          keyPath = i.path
          index = i
          break
        if i.name is index
          keyPath = i.path
          index = i
          break
        if i.path is index
          keyPath = i.path
          index = i
          break
      if index.$$index
        index = _.cloneDeep(index)
    if not key and value instanceof Object
      if value[definition.keyPath]
        key = value[definition.keyPath]
    if not value
      value = {}
    if index and index.$$index
      if value instanceof Object
        index.value = value[index.path]
      else if not value
        index.value = key
      else
        index.value = value
    if not key
      key = rfc4122.v4()
    if value instanceof Object
      value[definition.keyPath] = key
    if action.fn instanceof Function
      return action.fn(name, definition, key, value, index)
  execute = (action, name, key, value, index) ->
    if not action
      return $q.reject("No action defined")
    actualAction = null
    for actionKey of actions
      if not actions.hasOwnProperty(actionKey)
        continue
      if action is actionKey
        actualAction = actions[actionKey]
        actualAction.key = actionKey
        break
      if action is actions[actionKey]
        actualAction = actions[actionKey]
        actualAction.key = actionKey
        break
    if not actualAction
      return $q.reject("No action #{JSON.stringify(action)}")
    action = actualAction
    if action.implemented is no
      return $q.reject("The action #{action.key} is not yet implemented")
    if not name
      return $q.reject("Object store required")
    definition = parsed[name]
    if not definition
      return $q.reject("Object store '#{name}' doesn't exist")
    args = getArguments(action, name, definition, key, value, index);
    deferred = $q.defer()
    $indexedDB.openStore(name, (store) ->
      store[action.method].apply(store, args).then(
        deferred.resolve,
        deferred.reject
      )
    )
    return deferred.promise

  class DataDefinition
    $definition: null
    $key: null
    constructor: (key, definition)->
      this.$key = key
      this.$definition = definition
      def = this
      resultFunction = ->
        def.get.apply(def, arguments)
      for functionKey of DataDefinition.prototype
        if not DataDefinition.prototype.hasOwnProperty(functionKey)
          continue
        if this[functionKey] not instanceof Function
          continue
        if functionKey is "constructor"
          continue
        if functionKey is "get"
          continue
        ((r, f, d)->
          r[f] = ->
            d[f].apply(d, arguments)
        )(resultFunction, functionKey, this)

      return resultFunction
    get: (keyOrValue) ->
      return factory.get(
        this.$key,
        keyOrValue
      )
    index: (name, value) ->
      return factory.getBy(
        this.$key,
        name,
        value
      )
    put: (value) ->
      return factory.put(
        this.$key,
        value
      )
    remove: (keyOrValue) ->
      return factory.count(
        this.$key,
        keyOrValue
      )
    count: ->
      return factory.count(
        this.$key
      )
    getAll: ->
      return factory.getAll(
        this.$key
      )
    getAllKeys: ->
      return factory.getAllKeys(
        this.$key
      )
    clear: ->
      return factory.clear(
        this.$key
      )

  generateMap = ->
    map = {}
    for key of parsed
      if not parsed.hasOwnProperty(key)
        continue
      map[key] = new DataDefinition(key, parsed[key])
    return map

  factory = {
    map: generateMap()
    getBy: (name, index, key) ->
      return execute(actions.FindBy, name, key, null, index)
    get: (name, keyOrValue) ->
      return execute(actions.Find, name, keyOrValue)
    put: (name, key, value) ->
      return execute(actions.Upsert, name, key, value)
    remove: (name, keyOrValue) ->
      return execute(actions.Delete, name, keyOrValue)
    count: (name) ->
      return execute(actions.Count, name)
    getAll: (name) ->
      return execute(actions.GetAll, name)
    getAllKeys: (name) ->
      return execute(actions.GetAllKeys, name)
    clear: (name) ->
      return execute(actions.Clear, name)
  }
  return factory
window.app
.config(["$indexedDBProvider", ($indexedDBProvider) ->
    connection = $indexedDBProvider
      .connection('ngShipper.Database')

    upgrade = (version, keys) ->
      connection.upgradeDatabase(version, (event, db, tx)->
        for key in keys
          store = db.createObjectStore(key.name, {keyPath: key.keyPath})
          for index of key.indexes
            store.createIndex(index.name, index.path, {unique:index.unique})
      )
      return this
    version = 1
    for keys in definitions
      upgrade(version, keys)
      version += 1;

])
.factory("$data", ['$q', '$indexedDB', 'rfc4122', $dataFactory])