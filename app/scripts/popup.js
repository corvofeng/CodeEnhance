// can't use strict

options = chrome.extension.getBackgroundPage().options;
ENUM_FONTSIZE = chrome.extension.getBackgroundPage().ENUM_FONTSIZE;
ENUM_COLORSCHEME = chrome.extension.getBackgroundPage().ENUM_COLORSCHEME;
ENUM_FONTFACE = chrome.extension.getBackgroundPage().ENUM_FONTFACE;
ENUM_KEYMAP = chrome.extension.getBackgroundPage().ENUM_KEYMAP;
ENUM_LANG = chrome.extension.getBackgroundPage().ENUM_LANG; 

var settingInputs = ['font_size', 'color_scheme', 'font_face', 'key_map', 'lang', 'is_enable'];
var valueDefault = {
  'font_face' : ENUM_FONTFACE,
  'font_size' : ENUM_FONTSIZE,
  'color_scheme': ENUM_COLORSCHEME,
  'key_map': ENUM_KEYMAP,
  'lang': ENUM_LANG,
}

function getCurrentUrl(callback) {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  }, function (tabs) {
    var tab = tabs[0];
    callback(tab.url);
  });
};

function getInput (name) {
  return document.querySelector('[name="'+ name + '"]');
}


function initPage() {
  console.log(valueDefault)
  buildHTML();
  restoreOptions();
}

function buildHTML() {

  for(var i = 0; i < settingInputs.length; i++) {
    var key = settingInputs[i];
    var x = getInput(key);
    var enum_data = valueDefault[key];
    if  (enum_data == undefined) continue;

    for(var j = 0; j < enum_data.length; j++) {
      var data = enum_data[j];

      var option = document.createElement("option");
      option.value = data;
      option.text = data;
      x.add(option);
    }
  }
}

/**
 * Restore options from localstorage
 * @param  {bool} reset reset options to defaults.
 */
function restoreOptions() {

  for (var i = 0; i < settingInputs.length; i++) {
    var key = settingInputs[i];
    var value = options(key);
    if (!value) {
      continue;
    }

    var settingElement = getInput(key);
    var type = settingElement.nodeName.toLowerCase();

    if (type === 'select') {
      for (var j = 0; j < settingElement.children.length; j++) {
        var child = settingElement.children[j];
        if (child.value == value) {
          child.selected = "true";
        }
      }
    } else if (type === 'textarea') {
      settingElement.value = value;
    } else if (type == 'input' && settingElement.type == 'checkbox') {
//      (new Boolean(value) == true)? settingElement.value = true : settingElement;
      var checked = value == 'true';
      settingElement.checked = checked;
    }
  }
}

function submitChange() {
  chrome.extension.sendMessage({ method: "optionsChange"}, function (response){});
}

function fontChange() {
  var i = this.selectedIndex;
  var font = this.children[i].value;
  options("font_size", font);
  msgSave();
}

function themeChange() {
  var i = this.selectedIndex;
  var theme = this.children[i].value;
  options("color_scheme", theme);
  msgSave();
}

function fontFaceChange() {
  var i = this.selectedIndex;
  var face = this.children[i].value;
  options("font_face", face);
  msgSave();
}
function keyMapChange() {
  var i = this.selectedIndex;
  var k_map = this.children[i].value;
  options("key_map", k_map);
  msgSave();
}

function langChange() {
  var i = this.selectedIndex;
  var l = this.children[i].value;
  options("lang", l);
  msgSave();
}


function enableChange() {
  var i = this;
  options("is_enable", this.checked);
  msgSave();
}

function msgSave() {
  var save = getInput('save');
  save.style.visibility='visible';
  window.setTimeout(function() {
    save.style.visibility='hidden';
  }, 800);
  submitChange();
}


document.addEventListener('DOMContentLoaded', initPage);
document.querySelector('#leet_font').addEventListener('change', fontChange);
document.querySelector('#leet_theme').addEventListener('change', themeChange);
document.querySelector('#leet_font_face').addEventListener('change', fontFaceChange);
document.querySelector('#leet_key_map').addEventListener('change', keyMapChange);
document.querySelector('#leet_lang').addEventListener('change', langChange);
document.querySelector('#leet_enable').addEventListener('click', enableChange);


/*
document.addEventListener('', function () {
  var default_size = 18;
  var start = 14;

  var leet_font = document.getElementById("leet_font");

  //leet_font.options[0 - 14].selected=true;
  //leet_font.options[default_size - start].selected = "select";
  for (var j = 0; j < leet_font.children.length; j++) {
    var child = leet_font.children[j];
    if (child.value == value) {
      child.selected = "true";
    }
  }

  leet_font.addEventListener('change', function (data) {
    console.log("change make " + leet_font.selectedIndex);
  });

});
*/