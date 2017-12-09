'use strict'

import CodeMirror from '../util/imports'
import {
  defaultOption
} from '../util/config'

console.log("Code Mirror embed")

var onInit = function () {

}

var onGetOption = function () {

}

var onRefreshOption = function () {

}

var onEventCapture = function () {

}

var getLanguage = function () {
  return document.getElementsByClassName('Select-value')[0].innerText
}

var bindRequest = function () {

}

var getTopicCode = function() {

}

/**
 * a = ["cpp", "java", "python", "python3", "c", "csharp", "javascript", "ruby", "swift", "golang", "bash", "scala", "kotlin"]
 * s = ["text/x-c++src", "text/x-java", "text/x-python", "text/x-python", "text/x-c", "text/x-csharp", "text/javascript", "text/x-ruby", "text/x-swift", "text/x-go", "text/x-sh", "text/x-scala", "text/x-kotlin"]
 * l = ["C++", "Java", "Python", "Python3", "C", "C#", "JavaScript", "Ruby", "Swift", "Go", "Bash", "Scala", "Kotlin"]
 * 恢复LeetCode的初始代码, 此操作将会与button功能结合
 * : /problems/{TopicID}/code-definitions/{code}/
 * 
 *  $.ajax({
 *    type : "GET",  //提交方式
 *    url : "https://leetcode.com/problems/101/code-definitions/cpp/",//路径
 *    
 *    success : function(result) {//返回数据根据结果进行相应的处理
 *
 *    }
 * });
 * 
 */
var reSetDefaultCode= function () {

  $.ajax({
    type: "GET", //提交方式
    url: `${window.document.URL}cpp/`, //路径

    success: function (result) { //返回数据根据结果进行相应的处理
      console.log(result['code'])
      myCodeMirror.doc.setValue(result['code'])
    },
    error: function () {
      console.log('error')
      console.log(arguments)
    }
  });

}

var Lang2Req = {
  'C++': 'cpp',
  'Go': 'golang',
}


var oldCmDiv = document.getElementsByClassName('CodeMirror')[1]

var oldCm = oldCmDiv.CodeMirror
console.log(oldCm)

oldCmDiv.style.display = 'none'
defaultOption.value = oldCm.value

/*
var fx = function() {
  console.log(arguments)
  oldCm.doc.setValue(arguments)
}
*/

//oldCm.doc.setValue = fx


// cm.CodeMirror.setOption('theme', 'monokai');
//cm.setOption('keyMap', 'vim');
oldCm.getWrapperElement().style.fontSize = '18px'
oldCm.getWrapperElement().style.fontFamily = 'Consolas, Source Code Pro'
// CodeMirror.keyMap.default["Tab"] = "indentMore";

var input = document.createElement('textarea');
var reactCM = document.getElementsByClassName("ReactCodeMirror")[0]
var myArea = reactCM.appendChild(input)

var myCodeMirror = CodeMirror.fromTextArea(myArea, defaultOption)
oldCm.getValue = function () {
  return myCodeMirror.getValue()
}
myCodeMirror.on('change', function (cm) {
  oldCm.doc.setValue(cm.getValue())
  oldCm.replaceRange("foo\n", {
    line: 0
  });
})

myCodeMirror.save = function () {
  oldCm.save()
}

/*
$("reset-btn btn btn-default").on("click",function(){
  alert("The paragraph was clicked.");
});
*/

myCodeMirror.setOption("extraKeys", {
  Tab: function (cm) { // 使用空格缩进
    var unit = cm.getOption("indentUnit");
    var col = cm.getCursor().ch;
    var spaces = Array(unit + 1 - col % unit).join(" ");
    cm.replaceSelection(spaces);
  }
});
  