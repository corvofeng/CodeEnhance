# 需求要点

- [x] 针对不同的网站分别打包
- [ ] 程序模块化, 提取类
- [ ] 增加与后台程序的通信功能, 允许修改以及保存配置
- [ ] 将成功通过的代码添加到dropbox或其他云存储中

## 编辑器接口框架

`onInit`: 初始化编辑器

`onReadOption`: 读取配置信息

`onReplace`: 此函数中以新编辑器替换原有编辑器, 新的编辑器中的值将会继承原编辑器

`onEventCapture`: 捕捉原来编辑器中的事件, 例如清空, 重新载入代码, 在此函数中设置对原有事件的模拟

`onEventSet`: 设置新的编辑器的事件

`onValueChange`: 设置新编辑器值改变时的事件, 此时将值刷入旧有的编辑器中

`onSetOption`: 

`onOptionChange`

`onGetOption`

`onRefreshOption`: 配置改变时需要做出的响应


## 编辑器同步

### 编程问题

  编程时发现, 以下的方式实行同步, 是一种简单暴力的方式

```
title 简单同步
NewCM -> OldCM: change -> setValue
Note right of OldCM: 原有编辑器 
Note left of NewCM : 新的编辑器
OldCM --> NewCM: change -> setValue
```

  来回进行赋值, 势必发生无限循环的问题, 


### 解决方案

  采取双向同步的机制, 无论哪一个编辑器先做了改变, 另一个编辑器一定随之发生改变.

```
title 双向同步

CM1 -> Maintainer: change(state1 + 1)
Maintainer -> CM2: setValue
Maintainer -> CM1: setValue(state1 - 1)
CM1 -> Maintainer : change(state1 + 1)
CM2 -> Maintainer : change(state2 + 1)


Note left of CM1: 先做出改变的编辑器 
Note right of CM2 : 新的编辑器
```

该模型正常运行需要保证以下两点:

- 两个编辑器中初始状态必须相同, 这点在初始化时即可确定
- 同一时刻只有一个编辑器发生改变, 目前不做保证, 默认客户当前只对一个编辑器进行操作



