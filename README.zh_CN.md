# LeetEnhance

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badge/)    

# LeetCode更换网页编辑器为`CodeMirror`, 我正在尝试写一个新的扩展.

> 简单的增强LeetCode的功能.

* 当前仅支持`Vim`键位. 如果有兴趣, 欢迎添加`Emacs`键位.


## 动力

  其实在开始刷`LeetCode`时, 一直使用本地的`Vim`. 之后就直接使用在线的编辑器了, 可是又苦于
网页上的编辑器不够顺手, 可是搜索应用商店却没有发现类似的插件.

## 项目来源

  直到最近我才知道网站使用的是`Ace`这款网页代码编辑器. 就这样进行搜索, 终于在`Stack Overflow`
上[enable-vim-mode-in-gist-ace-editor][question-stack]问题中发现了`Nick Tomlin`的
[pocketvim][pocketvim]项目. 在此基础上进行了一些改造, 添加了一些简单的编辑器扩展功能. 

* 程序仅在`LeetCode`网站进行过测试, 不保证在其他使用`Ace`作为编辑器的网页可以正常运行.

## 适用范围
  
  1. 插件面向的是`LeetCode`用户;
  2. 使用`Vim`已经达到熟练程度的用户, 并且直接使用`LeetCode`的编辑器进行编码(其实, 纯文本
    的编辑器真的很不爽 '(*>﹏<*)' ).


## 现有功能

  1. 简单的`Vim`键位, 支持`?`进行搜索, 
  2. 在Ex模式下, 输入`r`, 即可运行代码, 输入`s`, 可以进行提交
  3. 支持主题, 字体, 字号更换(修改生效需要刷新界面)


## 待实现

  1. `Emacs`键位映射(可能不一定会添加, 对于`Emacs`用户, 我只能说声抱歉了).
  2. 修改当前设置时, 同步修改当前编辑器的设置
  3. ...


## LICENSE

本程序是自由软件，遵守自由软件基金会出版的GNU通用公共许可证(GNU General Public License)的各项条款。



[pocketvim]: https://github.com/NickTomlin/pocketvim
[question-stack]: https://stackoverflow.com/questions/15485153/enable-vim-mode-in-gist-ace-editor/20231327
