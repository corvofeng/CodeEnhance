(function (global) {
var leeetUtil,
  btnRun,
  btnSub,
  LeetEnhance = LeetEnhance || {};


/**
 * Init Func:
 *   1. Get "Run Code && Submit Solution" Button
 *   2. Remove editor css 
 * 
 *1. Get "Run Code && Submit Solution" Button
 *    When I try to use javascript run code or submit code in the pages,  I even
 *    can't found the event listener. 
 * 
 *    So I tried some projects or plans.
 *        1.simulate keyboard events(When you input Ctrl-', it means run).
 *          I get some help from https://stackoverflow.com/questions/961532/firing-a-keyboard-event-in-javascript, 
 *          it's a good idea, but I can't make it works;
 * 
 *        2.simulate click events.
 *          This is my last plan. if it doesn't works, I do not think that this 
 *          function should be retained. Finally, I found the button element, and 
 *          you can run the code by calling his click function.
 * 
 *2. Remove editor css 
 *  The origin has a class like that
 * 
 *    .editor {
 *      font-size: 14px !important;
 *      border: 1px solid #e0e0e0;
 *      height: 475px;
 *    }
 * 
 *    I couldn't modify editor size because of "font-size: 14px !important;", 
 * So I choose to remove this class.
 * 
 */
(function () {
  var btns = document.getElementsByClassName('btn btn-round');
  for (var i = 0; i < btns.length; i++) {
    var btn = btns[i];
    switch (btn.innerText.trim()) {
      case 'Run Code':
        btnRun = btn;
        break;
      case 'Submit Solution':
        btnSub = btn;
        break;
    }
  }

  var editor = document.getElementById('UNIQUE_ID_OF_DIV');
  editor.classList.remove('editor');
}());

leetUtil = {};

LeetEnhance.embedAce = function () {
  var acequire = ace.acequire ? ace.acequire : ace.require
  // github also adds a class of .ace-github to ace instance
  var instances = document.querySelectorAll(".ace_editor");
  Array.prototype.forEach.call(instances, function (instance) {
    instance
      .env
      .editor
      .setKeyboardHandler(acequire("ace/keyboard/vim").handler);
  });

  leetUtil.runCode = function () {
    btnRun.click();
  }
  leetUtil.subCode = function () {
    btnSub.click();
  }
  leetUtil.setFontSize = function (size) {
    alert(size);
    instances[0].env.editor.setFontSize(size);
  }
  leetUtil.setFontFace = function(fontFace) {
    instances[0].env.editor.setOption({fontFamily: fontFace});
  }
  leetUtil.setTheme = function(theme) {
    instances[0].env.editor.setTheme('ace/theme/' + theme);
  }
  leetUtil.setOptions = function(options) {
    instances[0].env.editor.setOptions({
      fontSize: parseInt(options['font_size']),
      fontFamily: options['font_face'],
      theme: 'ace/theme/' + options['color_scheme'],
    });
  }



  ace.config.loadModule('ace/keyboard/vim', function (module) {
    var VimApi = module.CodeMirror.Vim;
    /**
     * TODO:  if you have any good idea, just modify it.
     */
    VimApi.defineEx('write', 'w', function (cm, input) {
      //cm.ace.execCommand('save');
      console.log("Just Save");
    });

    /**
     * When you input r, means 'Run Code'
     */
    VimApi.defineEx('run', 'r', function (cm, input) {
      leetUtil.runCode();
    });
    VimApi.defineEx('submit', 'sub', function (cm, input) {
      leeetUtil.subCode();
    });


    module.CodeMirror.defineExtension("openDialog", function (template, callback, options) {
      var command = prompt("LeetEnhance", ":");
      if (command == undefined) {
        return;
      }
      callback(command);
    });


  });
};


LeetEnhance.embedAce();

var editor = document.getElementById('UNIQUE_ID_OF_DIV');

editor.addEventListener('option', function (e) {
  options = e.detail;
  leetUtil.setOptions(options);
}, false);

global.postMessage({
  type: "OPTIONS",
}, "*");

}(this));
