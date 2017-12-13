"use strict";

var Editors = {},
  Editor,
  load,
  injectScript,
  injectStyleSheet,
  attachListener,
  currentDomain,
  editor,
  editorElement,
  isInit;

//import CodeMirror from 'codemirror/lib/codemirror'
//import {leetcodeRun} from './page/leetcode'


/**
 * <script src="codemirror.js"></script>
 * Load "in-dom" js resources to get around
 * Chrome's seperation of extension / page DOM.
 * @param  {string} url path to js file from extension root
 * @param  {function} callback  optional callback to be fired on script 'onload' event
 */
injectScript = function(url, callback) {
  if (url == null)  return
  
  var s = document.createElement('script')
  s.src = chrome.runtime.getURL(url)
  // @todo potentially remove parentNode here and then call callback?
  if (callback != null) {
    s.onload = callback
  }
  document.head == null ? document.head.appendChild(s) 
                          : document.documentElement.appendChild(s)
};

/**
 * <link rel="stylesheet" type="text/css" href="style.css">
 * @param {string} url path to css file from extension root
 */
injectStyleSheet = function(url) {

  if (url == null)  return

  var s = document.createElement('link')
  s.type = "text/css"
  s.rel = "stylesheet"
  s.href = chrome.runtime.getURL(url)

  document.head == null ? document.head.appendChild(s)
                            :document.documentElement.appendChild(s)
}

/* ==========================================================================
   Page Interaction
   ========================================================================== */
// see if our page is enabled
currentDomain = window.location.origin + window.location.pathname;

/*
injectScript("/scripts/keybindings/codemirror/codemirror.js", function() {
  injectScript('/scripts/keybindings/codemirror/vim.js');
});
*/

// 不同站点与其对应js
var host2js = {
  "leetcode.com": "/dest/leetcode.js",
  "www.nowcoder.com": "/dest/nowcoder.js",
}

var addonSource = {
  "search": {
    "js": ['scripts/cm/addon/search/search.js', "scripts/cm/addon/search/searchcursor.js"],
    "css": []
  },
  "dialog": {
    "js": ['scripts/cm/addon/dialog/dialog.js'],
    "css": ['scripts/cm/addon/dialog/dialog.css']
  },
  "hint": {
    "js": ['scripts/cm/addon/hint/show-hint.js', 'scripts/cm/addon/hint/anyword-hint.js'],
    "css": ['scripts/cm/addon/hint/show-hint.css']
  },
  "clike": {
    "js": ["scripts/cm/mode/clike/clike.js"]
  }
}

/**
 * 这其实也是一种js的单例模式, 同时只能通过addons这个对象来操作其中的数据
 */
var addons = (function() {
  let dependenciesCSS = [
  ]
  let dependenciesJS = [
    'scripts/cm/codemirror.js',
    'scripts/cm/keymap/vim.js',
    'scripts/cm/keymap/sublime.js',
    'scripts/cm/keymap/emacs.js',
  ]

  return {
    addAddon : function(addon) {
      if(addonSource[addon]) {
        dependenciesJS = dependenciesJS.concat(addonSource[addon].js)
        dependenciesCSS = dependenciesCSS.concat(addonSource[addon].css)
      }
    },
    getAddon: function() {
      return {'js':dependenciesJS, 'css':dependenciesCSS}
    }
  }

})()


var loadHostJs = function() {
  if(host2js[window.location.host]) {
    injectScript(host2js[window.location.host], function () {
      console.log("load js ok")
    })
  } else { // 需要支持的网页, 发送开发者
    console.log("cur host needed to be added ", window.location.host)
  }
}

var injectRequire = function() {
  var s = document.createElement('script')
  s.src = chrome.runtime.getURL('scripts/require.js')
  document.head == null ? document.head.appendChild(s) 
                          : document.documentElement.appendChild(s)
}

/**
 * 检查网页是否在支持列表中, 并返回网页类型, 而后将会导入不同的js
 */
chrome.extension.sendMessage({ method: "isEnabled", url: currentDomain }, function (response) {
  // we don't want to do anything if the domain is not enabled
  console.log(response)
  if (!response) { return }

  loadHostJs()
  /*
    addons.addAddon('search')
    addons.addAddon('dialog')
    addons.addAddon('hint')
    addons.addAddon('clike')
    var dep = addons.getAddon()
    console.log(dep)
    loadJS(dep.js, 0, loadHostJs)
    loadCSS(dep.css, 0)
  */
});

var loadCSS = function(sources, current) {
  current = typeof current === 'undefined' ? 0 : current
  if (current >= sources.length) {
    return
  }

  var next = function () {
    loadCSS(sources, current + 1)
  }

  if (typeof sources[current] === 'undefined' || sources[current] === '') {
    next()
  } else {
    console.log("load ", sources[current])
    injectStyleSheet(sources[current], function () {
      next();
    });
  }
}


/**
 *  使用回调的方式, 防止js懒惰加载
 * @param  {array} sources array of extension root relative js files
 * @param  {int} current current member of source arary (internal use only)
 */
var loadJS = function (sources, current, callback) {
  current = typeof current === 'undefined' ? 0 : current
  if (current >= sources.length) {
    return
  }

  var next = function () {
    loadJS(sources, current + 1, callback)
  }

  if (typeof sources[current] === 'undefined' || sources[current] === '') {
    next()
  }
  console.log("load ", sources[current])
  if (current == sources.length - 1) {   // 注入最后一个js文件时, 使用回调函数
    injectScript(sources[current], callback)
  } else {
    injectScript(sources[current], function () {
      next();
    });
  }
}


/*
chrome.extension.sendMessage({ method: "getOptions", url: currentDomain }, function (options) {
  if (options == undefined) {
    return;
  }

  var enabled = options['is_enable'] == 'true';
  if (enabled) {
    editor = new Editors["Ace"](options);
    if (document.readyState == 'complete') {
      editor.loadDependencies();
    } else {
      // unfortunately 'DOMContentLoaded' appears to have iff support in background
      // and injected scripts. We use 'load' instead.
      window.addEventListener('load', function () {
        editor.loadDependencies();
      }, false);
    }
  }
});
*/

/* ==========================================================================
   Editor
   ========================================================================== */


/**
 * A small configurable class to normalize interaction with dom-based editor
 * @parameters {array} dependencies list of modules that editor depends on (usually keybinding and embedded code)
 */

Editor = function (options, editor) {
  this.options = options || {};
};

/**
 * Grab necessary files and load to DOM
 * @return {[type]} [description]
 */
Editor.prototype.loadDependencies = function () {
  load(this.getDependencies());
};

Editor.prototype.loadOptions = function () {

}

/**
 * Returns an array of dependencies. Order matters.
 * @return {array}
 */
Editor.prototype.getDependencies = function () {
  return this.options.dependencies.concat(this.options.binding, this.options.embed);
};

/* ==========================================================================
   Ace
   ========================================================================== */
Editors.Ace = function () {
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

Editors.CM = function () {
  Editor.apply(this, arguments);
};
Editors.CM.prototype = new Editor();
Editors.CM.prototype.getDependencies = function () {
  var dependencies = [
    'scripts/cm/codemirror.js',
    'scripts/cm/vim.js',  // 需要看情况进行添加
   // 'scripts/cm/addon/search/search.js',  // 需要看情况进行添加
   // 'scripts/cm/addon/dialog/dialog.js',  // 需要看情况进行添加
  ];

  //'scripts/modules/cm/embed.js',
  //  if(!this.options.binding) {
  // }
  return dependencies;
}

// 通过此函数获取
attachListener = function () {

  window.addEventListener("message", function (event) {
    console.log("detect Code Mirror---");
    editor = new Editors["CM"];
    editor.loadDependencies();
    console.log("debug over ----");

    if (event.source != window)
      return;

    // split this out into individual functions
    console.log(event);
    if (event.data.type == null) return;
    if (event.data.type = "DOMSPY") {
      if (event.data.editorName == 'CodeMirror') {
        //console.log(event.data);
        console.log("detect Code Mirror");
        editor = new Editors["CM"];
        if (document.readyState == 'complete') {
          editor.loadDependencies();
        } else {
          window.addEventListener('load', function () {
            editor.loadDependencies();
          }, false);
        }

      }
    } else if (event.data.type == "OPTIONS") {
      editorElement = document.getElementById('UNIQUE_ID_OF_DIV');
      var e = new CustomEvent('option', { 'detail': editor.options });
      editorElement.dispatchEvent(e);
      isInit = true;
    }
  }, false);

}