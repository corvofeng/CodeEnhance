'use strict'

/**
 * 双向同步管理工具
 */
var CodeSync = {
    
    inChange: false,
    biggestNum: 400,    // 记录状态最大量, 超过要归零

    addWraper: function(cmObj) {
        cmObj.changeState = 1
    },

    /**
     * 
     * @param {CodeMirror} cm1  首先改变的编辑器
     * @param {object} ch1      ChangeObject {from, to, text, origin}
     * @param {CodeMirror} cm2  需要进行同步的编辑器
     * @param {object} ch2
     */
    onUpdate: function(cm1, ch1, cm2, ch2) {
        
        if(this.inChange) { // 当前正在同步中, 不接受任何变化信号
            return
        }
        console.log(ch1)
        if(! cm1.hasOwnProperty('changeState')) {
            throw new Error('The addWrapper must be called before update')
        }
        this.inChange = true // 当前处于改变中

        // details in bellow
        cm2.doc.replaceRange(ch1.text, ch1.from, ch1.to, ch1.origin)

        this.inChange = false
    }
}

export {CodeSync}


/**
 * Detail:
 *   when I watch CodeMirror's Code, I can't find how to use changObj
 * which is in `beforeChange` event. So I want to know how the `beforeChange`
 * work, and I found this.
 * 
 *   当我阅读CodeMirror的文档时, 发现了`beforeChange`函数, 但是其中的changeObj变量
 * 却是无法使用, 而后, 我找到了`beforeChange`被调用的时刻, 从而也发现了change的来历.
 * 
 * function makeChange(doc, change, ignoreReadOnly) {
 *   ...
 *    if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
 *      change = filterChange(doc, change, true);
 *      if (!change) { return }
 *    }
 *    ...
 * }
 * 
 * 
 *   最终我找到了另外一个函数, 他会调用makeChange, 而且是由这些text构造了changeObj, 因此
 * 我可以通过将`changObj`分解, 而后调用`replaceRange`函数, 从而达到对另一个编辑器的改写
 * 目的.
 * 
 * It's called by makeChange. and the `change` object is be transferd form other function.
 * Then I got This.
 * 
 * function replaceRange(doc, code, from, to, origin) {
 *   if (!to) { to = from; }
 *   if (cmp(to, from) < 0) { var assign;
 *      (assign = [to, from], from = assign[0], to = assign[1], assign); }
 *   if (typeof code == "string") { code = doc.splitLines(code); }
 *      makeChange(doc, {from: from, to: to, text: code, origin: origin});
 * }
 * 
 *   It's create a `change` object and pass it to the `makeChange`, so I just 
 * use `replaceChange`, and when I test, I knew it must be OK.
 * 
 */