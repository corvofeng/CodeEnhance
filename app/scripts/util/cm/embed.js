(function (global) {
  console.log("Code Mirror embed");
  //console.log("start")


  var cm = global.document.getElementsByClassName('CodeMirror')[0].CodeMirror;
  // cm.CodeMirror.setOption('theme', 'monokai');
  //cm.setOption('keyMap', 'vim');
  cm.getWrapperElement().style.fontSize = '16px';
  cm.getWrapperElement().style.fontFamily = 'Source Code Pro, Consolas';
  CodeMirror.keyMap.default["Tab"] = "indentMore";

  cm.setOption("extraKeys", {
    Tab: function (cm) {  // 使用空格缩进
      var unit = cm.getOption("indentUnit");
      var col = cm.getCursor().ch;
      var spaces = Array(unit + 1 - col % unit).join(" ");
      cm.replaceSelection(spaces);
    }
  });

})(this);