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