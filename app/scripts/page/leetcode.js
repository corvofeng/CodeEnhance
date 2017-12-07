'use strict'

import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/keymap/vim'
//require('codemirror/addon/dialog');
//import 'codemirror/addon/dialog.css'
import CodeMirrorLoadMode from 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/dialog/dialog.css'

var leetcodeRun = function () {
    console.log("Code Mirror embed")
    
    var defaultOption = {
      "mode": "text/x-c++src",
      "keyMap": "vim",
      "theme": "monokai",
      "lineNumbers": true,
      "lineWrapping": true,
      "indentWithTabs": false,
      "autofocus": true,
      "tabSize": 4,
      "gutters": [
        "CodeMirror-linenumbers",
        "CodeMirror-foldgutter"
      ],
      "styleActiveLine": true,
      "matchBrackets": true,
      "value": null,
      "scrollbarStyle": null,

    }
  
    var onInit = function() {

    }

    var onGetOption = function() {

    }

    var onRefreshOption = function() {

    }

    var onEventCapture = function() {

    }

    var oldCmDiv = document.getElementsByClassName('CodeMirror')[1]
    while(typeof oldCmDiv.CodeMirror == "undefined") {}

    var oldCm = oldCmDiv.CodeMirror
    console.log(oldCm)
  
    oldCmDiv.style.display = 'none'
    defaultOption.value = oldCm.value
    
    debugger
    // cm.CodeMirror.setOption('theme', 'monokai');
    //cm.setOption('keyMap', 'vim');
    oldCm.getWrapperElement().style.fontSize = '18px'
    oldCm.getWrapperElement().style.fontFamily = 'Consolas, Source Code Pro'
    // CodeMirror.keyMap.default["Tab"] = "indentMore";

    var input = document.createElement('textarea');
    var reactCM = document.getElementsByClassName("ReactCodeMirror")[0]
    var myArea = reactCM.appendChild(input)

    var myCodeMirror = CodeMirror.fromTextArea(myArea, defaultOption)
    oldCm.getValue = function() {
      return myCodeMirror.getValue()
    }
    myCodeMirror.on('change', function(cm) {
      oldCm.doc.setValue(cm.getValue())
      oldCm.replaceRange("foo\n", {line: 0});
    })

    myCodeMirror.save = function() {
      oldCm.save()
    }

    /*
    $("reset-btn btn btn-default").on("click",function(){
      alert("The paragraph was clicked.");
    });
    */
  
    myCodeMirror.setOption("extraKeys", {
      Tab: function (cm) {  // 使用空格缩进
        var unit = cm.getOption("indentUnit");
        var col = cm.getCursor().ch;
        var spaces = Array(unit + 1 - col % unit).join(" ");
        cm.replaceSelection(spaces);
      }
    });
  
}

leetcodeRun();