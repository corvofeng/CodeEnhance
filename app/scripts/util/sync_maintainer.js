'use strict'

/**
 * 双向同步管理器
 */

var CodeSync = {
    inChange: false,
    biggestNum: 400,    // 记录状态最大量, 超过要归零

    addWraper: function(cmObj) {
        cmObj.changeState = 1
    },

    onUpdate: function(cmObj, chObj) {
        if(inChange) { // 当前正在同步中, 不接受任何变化信号
            return
        }
        if(! cmObj.hasOwnProperty('changeState')) {
            throw 'The addWrapper must be called before update'
        }
        inChange = true // 当前处于改变中

        cmObj.changeState = (cmObj + biggestNum - 1) % biggestNum

        // set value

        inChange = false
    }

}


