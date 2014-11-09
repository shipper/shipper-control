# Copyright (C) Fabian Cook - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Written by Fabian Cook <fabian.cook@shipper.co.nz>, 4/ 11 / 14
failed = no

Modernizr.addTest "cssscrollbar", ->
  bool = undefined
  styles = "#modernizr{overflow: scroll; width: 40px }#" +
      Modernizr._prefixes.join("scrollbar{width:0px}" +
        " #modernizr::").split("#").slice(1).join("#") +
      "scrollbar{width:0px}"
  Modernizr.testStyles styles, (node) ->
    bool = "scrollWidth" of node and node.scrollWidth is 40
    return

  bool

tests = [
  Modernizr.indexeddb
  Modernizr.opacity
  Modernizr.flexbox
  Modernizr.history
  Modernizr.localstorage
  Modernizr.svg
  Modernizr.websockets
  !!window["Promise"]
  Modernizr.draganddrop
  Modernizr.rgba
  Modernizr.input.placeholder
  Modernizr.boxshadow
  Modernizr.borderradius
  Modernizr.webworkers
  Modernizr.cssanimations
  'Notification' of window && 'permission' of window.Notification && 'requestPermission' of window.Notification
  'download' of document.createElement('a')
  Modernizr.cssscrollbar
]
for val in tests
  if not val
    failed = yes
    break

window.canuse = not failed

if not canuse
  window.location.href = "http://outdatedbrowser.com/en"