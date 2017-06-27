options = chrome.extension.getBackgroundPage().options;
ENUM_FONTSIZE = chrome.extension.getBackgroundPage().ENUM_FONTSIZE;
ENUM_COLORSCHEME = chrome.extension.getBackgroundPage().ENUM_COLORSCHEME;

var settingInputs = ['font_size', 'color_scheme'];

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


function init() {
  buildHTML();
  resetOptions();
}

function buildHTML() {
  for(var i = 0; i < ENUM_FONTSIZE.length; i++) {
    console.log(ENUM_FONTSIZE[i])
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
   // alert(value);

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
    }
  }
}
function fontChange() {
  var i = this.selectedIndex;
  var font = this.children[i].value;
  options("font_size", font);
  msgSave();
}

/**
 * 
 */
function msgSave() {
  var save = getInput('save');
  save.style.display='block';
  window.setTimeout(function() {
    save.style.display='none';
  }, 800);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#leet_font').addEventListener('change', fontChange);



document.addEventListener('', function () {
  /*
  var input = document.querySelector('[name="current_url"]');
  getCurrentUrl(function (url) {
    // tab.url is equiavlent to window.location.href
    var urlHost = url.split('/').slice(0,3).join('/') + '/*';
    input.value = urlHost;
  });
  */

  /*
    var submit = document.querySelector('button');
    submit.addEventListener('click', function () {
      // there is probably a more elegant way to do this...
      proposedUrl = input.value.trim(); // chrome supports string.trim ^^
      currentUrls = options('enabled_urls') || '';
      if (currentUrls.indexOf(proposedUrl) === -1) {
        options('enabled_urls', currentUrls + proposedUrl + '\n' );
        this.disabled = true;
      }
    });
    */

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
