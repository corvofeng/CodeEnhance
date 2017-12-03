(function (global) {
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
    }
  
    var onInit = function() {

    }

    var onGetOption = function() {

    }

    var onRefreshOption = function() {

    }

    var onEventCapture = function() {

    }


  
    var oldCmDiv = global.document.getElementsByClassName('CodeMirror')[1]
    oldCmDiv.style.display = 'none'
    var oldCm = oldCmDiv.CodeMirror
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
  
    cm.setOption("extraKeys", {
      Tab: function (cm) {  // 使用空格缩进
        var unit = cm.getOption("indentUnit");
        var col = cm.getCursor().ch;
        var spaces = Array(unit + 1 - col % unit).join(" ");
        cm.replaceSelection(spaces);
      }
    });
    */
  
  })(this);