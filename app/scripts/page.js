"use strict";

var Editors = {},
Editor,
// helpers
load,
injectScript,
injectStyleSheet,
attachListener,
// static
currentDomain
;

/* ==========================================================================
   Helpers
   ========================================================================== */
/**
 * Load "in-dom" js resources to get around
 * Chrome's seperation of extension / page DOM.
 * @param  {string} url path to js file from extension root
 * @param  {function} callback  optional callback to be fired on script 'onload' event
 */
injectScript = function (url, callback) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(url);
    // @todo potentially remove parentNode here and then call callback?
    s.onload = callback;
    (document.head||document.documentElement).appendChild(s);
};

/**
 * <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet">
 */ 
injectStyleSheet = function(url, callback) {
  var s = document.createElement('link');
  s.href = url
  link.rel = 'stylesheet';

  s.onload = callback;
  (document.head||document.documentElement).appendChild(s);
}

/* ==========================================================================
   Editor
   ========================================================================== */
/**
 * Provide an "orderly" load of dependencies
 * @param  {array} sources array of extension root relative js files
 * @param  {int} current current member of source arary (internal use only)
 */
load = function (sources, current) {
  current = typeof current === 'undefined' ? 0 : current;
  if (current >= sources.length) {
    return;
  }

  var next = function () {
    load(sources, current + 1);
  };

  if ( typeof sources[current] === 'undefined' || sources[current] === '' ) {
    next();
  } else {
    injectScript(sources[current], function () {
      next();
    });
  }
};

/**
 * A small configurable class to normalize interaction with dom-based editor
 * @parameters {array} dependencies list of modules that editor depends on (usually keybinding and embedded code)
 */

Editor  = function (options) {
  this.options = options || {};
};

/**
 * Grab necessary files and load to DOM
 * @return {[type]} [description]
 */
Editor.prototype.loadDependencies = function () {
  load(this.getDependencies());
};

Editor.prototype.loadStyleSheet = function() {
  load(this.getStyleSheet());
}

/**
 * Returns an array of dependencies. Order matters.
 * @return {array}
 */
Editor.prototype.getDependencies = function () {
  return this.options.dependencies.concat(this.options.binding, this.options.embed);
};

Editor.prototype.getStyleSheet = function() {};

Editor.prototype.set = function () {};

Editor.prototype.get = function () {};

Editor.prototype.setFontSize = function (size) {

};

/* ==========================================================================
   Ace
   ========================================================================== */
Editors.Ace = function (){
    Editor.apply(this, arguments);
};

Editors.Ace.prototype = new Editor();

Editors.Ace.prototype.getDependencies = function () {
  var dependencies = [
      'scripts/modules/ace/embed.js', 
      'scripts/modules/util/fontdetect.js'];
  // ace 1.1.1 includes keybindings by default
  // we only include it manually if there is no binding on the page
  if (!this.options.binding) {
    dependencies.unshift('scripts/keybindings/ace/keybinding-vim.js');
  }

  return dependencies;
};

Editors.Ace.prototype.getStyleSheet = function() {
  var stylesheet = [
    "https://fonts.googleapis.com/css?family=Source+Code+Pro",
  ]
  return stylesheet;
}

/* ==========================================================================
   Page Interaction
   ========================================================================== */
// see if our page is enabled

currentDomain = window.location.origin + window.location.pathname;

chrome.extension.sendMessage({method: "isEnabled", url: currentDomain }, function(response) {
    // we don't want to do anything if the domain is not enabled
    if (!response) { return; }

     //chrome.tabs.insertCSS(details.tabId,  { code : '@import url(custom.css);' });

     injectScript('/scripts/modules/domspy.js', function () {
      attachListener();
    });
});

// interact with our injected script
attachListener = function () {
  // @todo remove listener if domspy returns a falsy value
  window.addEventListener("message", function(event) {
      // We only accept messages from ourselves


      if (event.source != window)
        return;

      // split this out into individual functions
      if (event.data.type && (event.data.type == "DOMSPY")) {
        if (! event.data.editorName) return;

        var options = JSON.parse(event.data.editorOptions);
        var editor = new Editors[event.data.editorName](options);
        if (document.readyState == 'complete') {
            editor.loadDependencies();
        } else {
          // unfortunately 'DOMContentLoaded' appears to have iff support in background
          // and injected scripts. We use 'load' instead.
          window.addEventListener('load', function () {
            editor.loadDependencies.call(editor);
          }, false);
        }
      } else if (event.data.type && (event.data.type === "FONT_CHANGE")) {

      }
  }, false);
};

