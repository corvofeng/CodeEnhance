'use strict'

import CodeMirror from '../util/imports'
import {defaultOption} from '../util/config'
import {debug} from 'util';
import {CodeSync} from '../util/sync_maintainer'

console.log("Code Mirror embed")

var onInit = function () {
  return document.getElementsByClassName('Select-value')[0].innerText
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
var reSetDefaultCode = function () {

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

var oldCmDiv = document.getElementsByClassName('CodeMirror')[1]

var oldCm = oldCmDiv.CodeMirror

oldCmDiv.style.display = 'none'
console.log(oldCm.doc.getValue())
defaultOption.value = oldCm.value

//oldCm.doc.setValue = fx


//cm.setOption('keyMap', 'vim');
oldCm.getWrapperElement().style.fontSize = '18px'
oldCm.getWrapperElement().style.fontFamily = 'Consolas, Source Code Pro'
// CodeMirror.keyMap.default["Tab"] = "indentMore";

/**
 * 为旧有编辑器设置内容
 * @param {object} cmObj 旧有的CodeMirror对象
 * @param {*} v 新的文本内容
 */
function setOldCMValue(v) {
  this.doc.setValue(v)
  this.replaceRange("foo", {line: 0})
}


var c;
/**
 * Note: you may not do anything from a "beforeChange" handler that would 
 * cause changes to the document or its visualization. Doing so will, 
 * since this handler is called directly from the bowels of the 
 * CodeMirror implementation, probably cause the editor to become corrupted.
 * 
 * change: After the docchanged.
 */


function changeTxt(obj) {
  console.log("change Txt", obj)
}

var myCodeMirror;

/**
 * 初始化新的编辑器
 */
function initNewCM() {
  var input = document.createElement('textarea');
  var reactCM = document.getElementsByClassName("ReactCodeMirror")[0]
  var myArea = reactCM.appendChild(input)

  console.log(defaultOption)
  myCodeMirror = CodeMirror.fromTextArea(myArea, defaultOption)
  myCodeMirror.setMustValue = myCodeMirror.setValue
  oldCm.setMustValue = setOldCMValue;

  CodeSync.addWraper(oldCm)
  CodeSync.addWraper(myCodeMirror)

  oldCm.on('beforeChange', function(cm, obj) {
    console.log('[oldCM] before change', cm); 
    console.log('[oldCM] before change', cm); 
    // c = obj; 
    CodeSync.onUpdate(cm, obj, myCodeMirror, null)
    //changeTxt(obj)
  })

  myCodeMirror.on('beforeChange', function(cm, obj) {
    // console.log(val); 
    // c = obj; 
    console.log('[NewCM] before change', cm); 
    console.log('[NewCM] before change', obj); 
    CodeSync.onUpdate(cm, obj, oldCm, null)
    //changeTxt(obj)
  })
}

initNewCM()

/*
oldCm.getValue = function () {
  return myCodeMirror.getValue()
}
myCodeMirror.replaceRange
myCodeMirror.on('change', function (cm) {
  oldCm.doc.setValue(cm.getValue())
  oldCm.replaceRange("foo\n", {
    line: 0
  });
})

myCodeMirror.save = function () {
  oldCm.save()
}
*/

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
  