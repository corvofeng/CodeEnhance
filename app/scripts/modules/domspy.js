(function (global) {
  var editor, acequire;
  var domSpy = {};

  domSpy.cm = global.document.getElementsByClassName("CodeMirror")? "CodeMirror": undefined;

  // Original Ace editor has been changed to codemirror editor. 
//  domSpy.ace = global.hasOwnProperty("ace") ? "Ace" : undefined;

  editor = {
    name: domSpy.cm || domSpy.ace,
    options: {}
  };

  if (domSpy.ace) {
    acequire = ace.acequire ? ace.acequire : ace.require;
    //editor.options.binding = acequire("ace/keyboard/vim");


    ace.acequire(["ace/keyboard/vim"], function(acevim) {
      // console.log("acequire");
      // e.setKeyboardHandler(acevim.handler);
    });

  } else if (domSpy.cm) {
    console.log("Not very happy");
    editor.options.version = global.CodeMirror && global.CodeMirror.version || false;
  }

  global.postMessage({
    type: "DOMSPY",
    editorName: editor.name,
    editorOptions: JSON.stringify(editor.options)
  }, "*");
}(this));
