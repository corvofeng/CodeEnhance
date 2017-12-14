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
    "styleActiveLine": true,
    "matchBrackets": true,
    "value": null,
    "scrollbarStyle": null,


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
    }
}

export {defaultOption, dynamicOption}