var Enum = Object.freeze({
  Editor: Object.freeze({AceEditor:0 , CodeMirror:1}),
  FontSize: Object.freeze([13, 14, 15, 16, 17, 18]),
  FontFace: Object.freeze([
    'Source Code Pro',
    'monospace'      ,
    'Lucida Console' ,
    'consolas'       , 
    'monaco'])       ,
  ColorScheme: Object.freeze([
    'xcode'          ,
    'terminal'       ,
    'ambiance'       ,
    'monokai'        ,
    'tomorrow'       ,
    'twilight'       ,
    'textmate'       ,
    'solarized_dark' ,
    'solarized_light',
    'chaos'          ,
    'chrome'         ,
    'github'         ,
    ])
});


var pageSet = {

};

var getCurrentTab,
getCurrentUrl,
options,
isEnabled,
publicApi,
restoreDefaultOptions,
defaults = {
  enabled_urls : [
   'https://leetcode.com/*',
   'http://lintcode.com/*',
   'https://interview.nowcoder.com/*',
   'https://www.nowcoder.com/*',
  ].join('\n'),
  font_size: 15,
  color_scheme: 'xcode',
  font_face : 'Source Code Pro',
  show_invisibles: false,
  is_enable: true
};

var ENUM_FONTSIZE = [
  13,
  14,
  15,
  16,
  17,
  18,
  19
],
ENUM_FONTFACE = [
  'Source Code Pro',
  'monospace',
  'Lucida Console',
  'consolas',
  'monaco'
],
ENUM_COLORSCHEME = [
  'xcode',
  'terminal',
  'ambiance',
  'monokai',
  'tomorrow',
  'twilight',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'chaos',
  'chrome',
  'github',
];

// our event bus
// inspired by Vimium
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request)
  console.log(sender)
  if (publicApi[request.method]) {
    sendResponse(publicApi[request.method](request))
  }
  return false
})

getCurrentTab = function (callback) {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function (tabs) {
    var tab = tabs[0]
    callback(tab)
  })
}

getCurrentUrl = function (callback) {
  getCurrentTab(function (tab) {
    return tab.url
  })
}

/**
 * Get and Set for localstorage based options
 * @return {[type]} [description]
 * @todo!2#security consider checking for OUR local storage keys to avoid hijacking.
 */
options = function () {
  var get = function (key) {
    return localStorage[key];
  };

  var set = function () {
    var key = arguments[0];
    var value = arguments[1];
    localStorage[key] = value;
  };

  var all = function () {
    var allSettings = [];
    for (var prop in localStorage) {
      var setting = {};
      setting[prop] = localStorage[prop];
      allSettings.push(setting);
    }
    return allSettings;
  };

  // if no arguments are passed, return all settings
  if (arguments.length < 1) {
    return all();
  }
  // otherwise return get or set depending on wheter a key arguement was passed
  return arguments.length === 1 ? get.apply(null, arguments) : set.apply(null, arguments);
};

options.restoreDefaultOptions = function () {
  for (var prop in defaults) {
    if (defaults.hasOwnProperty(prop))
      options(prop, defaults[prop]);
  }
};

// set defaults (hopefully only once ;)
if (! localStorage["initialized"]) {
  options.restoreDefaultOptions();
  localStorage["initialized"] = true;
}


// inspired / stolen from Vimium
isEnabled = function (request) {
  var url = request.url;
  enabledUrls = options("enabled_urls");
  
  var enabled = localStorage['is_enable'] == 'true';
  if (!enabled) {
    return false;
  }

  // handle wildcard in enabled urls
  // use array.some so we can escape http://stackoverflow.com/a/2641374/1048479
  // @todo#codingsmell is this too clever?
  return enabledUrls.split('\n').some(function (enabledUrl) {
    var urlRe = new RegExp('^' + enabledUrl.replace(/\*/g,'.*') + "$");
    return urlRe.test(url);
  });
};

getOptions = function(request) {
  if (!isEnabled(request)) {
    return undefined;
  }

  return localStorage; 
}

var optionsChange = function() {
  console.log("The Change has been made")
}

// 安装时
chrome.runtime.onInstalled.addListener(function (details) {
  console.log(details)
  console.log('previousVersion', details.previousVersion)
});

publicApi = {
  isEnabled: isEnabled,
  getOptions: getOptions,
  optionsChange:  optionsChange,
};

