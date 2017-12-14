'use strict'


var defaultOption = {
    "lineNumbers": true,
    "lineWrapping": true,
    "indentWithTabs": false,
    "indentUnit": 4,
    "autofocus": true,
    "tabSize": 4,
    "gutters": [
      "CodeMirror-linenumbers",
      "CodeMirror-foldgutter"
    ],
    'foldGutter': true,
    'autoCloseBrackets': true,
    "styleActiveLine": true,
    "matchBrackets": true,
    "scrollbarStyle": null,
}

// a = ["cpp", "java", "python", "python3", "c", "csharp", "javascript", "ruby", "swift", "golang", "bash", "scala", "kotlin"]
let mode = ["text/x-c++src", "text/x-java", "text/x-python", "text/x-python", "text/x-c", "text/x-csharp", "text/javascript", "text/x-ruby", "text/x-swift", "text/x-go", "text/x-sh", "text/x-scala", "text/x-kotlin"]
let lang = ["C++", "Java", "Python", "Python3", "C", "C#", "JavaScript", "Ruby", "Swift", "Go", "Bash", "Scala", "Kotlin"]

function getMode(l) {
  let i = 0;
  for (; i < lang.length; i++)
    if (lang[i] == l)
      break

  return mode[i]
}

var dynamicOption = {
    "font_face": "Source Code Pro",
    "font_size": "16",
    "keyMap": "vim",
    "theme": "monokai",
    "mode": "text/x-c++src",
    "dropbox_token": null,

    read_option: function (params) {
     // {"color_scheme":"solarized_light",
     // "font_face":"monospace","font_size":"16",
     // "initialized":"true","is_enable":"true","key_map":"vim","show_invisibles":"false"} 
      this.theme = params.color_scheme
      this.keyMap = params.key_map
      this.font_face = params.font_face
      this.font_size = params.font_size
      this.mode = getMode(params.lang)
    }
}

export {defaultOption, dynamicOption}