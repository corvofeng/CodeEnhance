# 前端工具简介

> 项目中使用了`gulp`以及`webpack`进行自动化项目构建及打包


## webpack

 webpack: 将多个js, css文件合并为一个大而全的js文件.

  在项目中主要是由于`codemirror`编辑器有许多的依赖文件, 如果一个个的手动导入,
势必会造成代码混乱, 而使用`import`, `export`不仅有助于包的导入, 也有助于程序
的结构化


## gulp

  gulp: 自动化工具, 可以指定任务的动作以及依赖

  wepback的打包更适合于开发阶段, 可以生成单个js, 而在发布阶段, wepback打包zip
就显得力不从心了, 故而结合使用, 开发阶段侧重于webpack的打包使用
