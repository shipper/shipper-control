(function() {
  var failed, tests, val, _i, _len;

  failed = false;

  Modernizr.addTest("cssscrollbar", function() {
    var bool, styles;
    bool = void 0;
    styles = "#modernizr{overflow: scroll; width: 40px }#" + Modernizr._prefixes.join("scrollbar{width:0px}" + " #modernizr::").split("#").slice(1).join("#") + "scrollbar{width:0px}";
    Modernizr.testStyles(styles, function(node) {
      bool = "scrollWidth" in node && node.scrollWidth === 40;
    });
    return bool;
  });

  tests = [Modernizr.indexeddb, Modernizr.opacity, Modernizr.flexbox, Modernizr.history, Modernizr.localstorage, Modernizr.svg, Modernizr.websockets, !!window["Promise"], Modernizr.draganddrop, Modernizr.rgba, Modernizr.input.placeholder, Modernizr.boxshadow, Modernizr.borderradius, Modernizr.webworkers, Modernizr.cssanimations, 'Notification' in window && 'permission' in window.Notification && 'requestPermission' in window.Notification, 'download' in document.createElement('a'), Modernizr.cssscrollbar];

  for (_i = 0, _len = tests.length; _i < _len; _i++) {
    val = tests[_i];
    if (!val) {
      failed = true;
      break;
    }
  }

  window.canuse = !failed;

  if (!canuse) {
    window.location.href = "http://outdatedbrowser.com/en";
  }

}).call(this);
