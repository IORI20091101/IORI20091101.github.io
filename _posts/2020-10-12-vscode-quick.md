---
layout: post
title: VSCode使用指南
subtitle: 熟悉VSCode各种设置快捷键以及插件
date: 2020-10-12
author: "toshiba"
header-img: "images/bg/batman/bat1.jpg"

comments: true

tags:
  - 生产工具
  - IDE
  - VSCode
categories:
  - 生产工具
---

### 高频操作

#### 自定义快捷键

- `Command + Shift + P 输入 打开键盘快捷方式` 或者 `Command k + Command r` 打开快捷键 pdf 链接

#### 光标移动

- `Opts + 左右箭头` 光标在单词间跳转
- `Command + 左右箭头` 光标在行首行末之际跳转
- `Command + 上下箭头` 光标在文件开始和末尾之际跳转
- `Command + Shift + \` 光标在文件开始和末尾之际跳转

#### 文本选择

你单击鼠标左键就可以把光标移动到相应的位置。而双击鼠标左键，则会将当前光标下的单词选中。连续三次按下鼠标左键，则会选中当前这一行代码。最后是连续四次按下鼠标左键，则会选中整个文档

- `Opts + Shift + 左右箭头` 选中单词
- `Command + Shift + P 输入选择括号所有内容` 将光标所在打括号的内容选中
- `在编辑器的最左边拖动行号的位置选中拖动可以选中多行`

#### 代码行编辑

- `Command + Shift + K` 删除一行代码或多行
- `Command + X` 剪切代码
- `Command + Enter` 无论在一行的什么位置会在下面新建一行不会将一行分成两端
- `Command + Shift + Enter` 无论在一行的什么位置会在上面新建一行不会将一行分成两端
- `Option + up/down` 移动行
- `Option + Shift + up/down` 复制所在行到上面或者下面

#### 合并代码行

- `Ctrl + j` 将选中的代码行合并

#### 调整字符大小写

- `你可以选中一串字符，然后在命令面板里运行“转换为大写”或 “转换为小写”, 来变换字符的大小写。`

#### 代码格式化

- `Option + Shift + F` 对整个文档进行格式化
- `Command + K Command + F` 对选中代码进行格式化

#### 添加代码注释

- `Option + Shift + A` 对选中内容进行注释
- `Command + /` 对选中内容进行注释

#### 代码补全

- `Ctrl + 空格` 调出建议列表或者 tab 键调出
- `Command + Shift + 空格` 调出建议参数预览

#### 快速修复

- `Command + .` 对于拼错的 css 或者 js 进行修复

#### 重构

- `F2` 修改一个函数或者变量的名字时候，我们只需把光标放到函数或者变量名上，然后按下 F2，这样这个函数或者变量出现的地方就都会被修改。

- 另一个常用的重构的操作就是把一段长代码抽取出来转成一个单独的函数。在 VS Code 中，我们只需选中那段代码，点击黄色的灯泡图标，然后选择对应的重构操作即可。

#### 多行操作多光标

- `Option + 鼠标点击` 对于点中的地方会有一个光标，对于点击到的位置可以操作

- `Command + Option + up/down` 可以移动时可以产生光标，可以再通过 `Command + 左右方向键` 可以移动到每一行末尾

- `Command + D` ，第一次按下时，它会选中光标附近的单词；第二次按下时，它会找到这个单词第二次出现的位置，创建一个新的光标，并且选中它。这样只需要按下三次，你就选中了所有的“5”。这个时候你再按下 “右方向键”，输入“px”，即可完成任务。

- `Option + Shift + i` 首先你选择多行代码，然后按下 “Option + Shift + i” （Windows 上是 Alt + Shift + i），这样操作的结果是：每一行的最后都会创建一个新的光标。

- VS Code 中还有一个更加便捷的鼠标创建多光标的方式。当然，这首先要求你的鼠标拥有中键。你只需按下鼠标中键，然后对着一段文档拖出一个框，在这个框中的代码就都被选中了，而且每一行被选中的代码，都拥有一个独立的光标。

#### 折叠代码

- `Command + Option + [` 光标所在位置代码片段折叠一层
- `Command + Option + ]` 光标所在位置代码片段展开一层
- `Command + K Command + [` 将一直到最外层所有折叠
- `Command + K Command + ]` 将一直到最外层所有展开
- `Command + K Command + 0` 代码全部合并
- `Command + K Command + j` 代码全部展开

#### 单文件搜索

- `Command + F` 在文件内搜索
- `Enter 或者 Shift + Enter` 在搜索内容中跳转
- `Command + G` 首先我们将光标移动到我们想要搜索的单词处，然后不断按下快捷键就可以从上往下查找搜索内容并移动光标
- `Command + Shift + G` 从下往上查找搜索内容并移动光标
- `Command + Option + F` 在文件内替换

#### 多文件搜索

- `Command + Shift + F` 在文件夹内搜索跟替换

#### 行跳转

- `Ctrl + G` 输入 10:3 跳到第 10 行第三列

#### 符号跳转

- `Command + Shift + O` 可以看到当前文件的所有符号，如方法名

#### 文件跳转

- `Ctrl + tab` 罗列现在已经打开到文件列表
- `Command + P` 跳出一个最近打开文件的列表，同时在列表的顶部还有一个搜索框
- `Cmd + Enter` （Windows 上是 Ctrl + Enter）组合键。这个文件在一个新的编辑器窗口中打开了。

### 常规操作

#### 命令行的使用

我们可以通过命令行直接启动<code>VSCode</code>，windows 用户可以通过添加安装目录到系统环境变量 PATH 中,如果是 mac 用户

- `Command + Shift + P`
- `搜索框中输入 Shell 命令：在 PATH 中安装 “Code” 命令`
- `重启VSCode`

然后就可以在终端中通过 code 命令直接打开<code>VSCode</code>了，
常用的命令行使用命令

- `code -r .` 打开当前目录 -r 代表窗口复用
- `code -r -g package.json:10:15` 打开当前目录 -g 跳转到某个文件
- `code -r -d a.txt b.txt` 打开当前目录 -d 比较两个文件差异

还有一个比较好的就是接受管道数据

- `ls | code -` 改命令可以将目录下的所有文件名展示到<code>VSCode</code>中

#### 设置中文

首先我们可能需要为<code>VSCode</code>设置语言，这个并不是必要操作但是可以为英语不好的同学提供一个过渡选择

- `Command + Shift + P` or `F1`
- `搜索框中输入 configure display language 然后安装其他语言选择简体中文`
- `重启VSCode`

#### 删除操作

- `Command + Backspace` 删除该行左边
- `Command + Delete` 删除该行右边

#### 撤销光标移动

- `Command + u` 移动光标到上次的位置

#### 行排序

你都可以把代码行按照字母序进行重新排序。不过这个命令比较小众，VS Code 并没有给这个命令指定快捷键，你可以调出命令面板，然后搜索 “按升序排列行” 或者 “按降序排列行” 命令执行。

#### 调整字符的位置

- `Ctrl + t` 交互字符位置

#### 定义与实现之间的跳转

- `F12 or Command + F12` 按下 F12，就可以跳转到函数的定义处。

#### 跳到引用的地方

- `Shift + F12` 打开函数引用预览

#### 代码片段

- `Command + Shift + P`： 配置用户代码片段 configure user snippets

```javascript
"Print to console": {
    "prefix": "log",
    "body": [
        "console.log(${1:i});",
        "$2"
    ],
"description": "Log output to console"
}
```

#### 工作区

- 首先打开一个文件夹 然后 打开命令面板 F1 或者 `Command + Shift + P` 输入 将文件夹添加到工作去（add folder to workspace）
- 再一次打开命令面板 输入 “将工作区另存为” （save workspace as） 这样下次可以一次打开一个工作区
- `Ctrl + W` 可以切换工作区
- `Ctrl + R` 显示最近打开的文件夹列表
- `Ctrl + R ` 选中后 `Command + Enter` 可以在新窗口打开

#### 显示终端

- Ctrl + ` 可以打开或者隐藏终端
- 新建一个文件在其中输入内容`ls -al` 打开命令面板在其中输入 "在活动终端中运行活动文件" 这个脚本会在继承终端中运行

#### 拆分编辑器

- `命令面板中搜索 拆分编辑器` 可以将编辑器拆分多个
- `Cmd + 1、Cmd + 2 和 Cmd + 3` 在三个编辑器中跳转
- `Cmd + Option + 0` 可以在纵向拆分跟横向拆分之间切换
- `Cmd + Option + up/down` 可以在窗口之间切换
- `命令面板中搜索 2 x 2 网格编辑器布局` 可以将编辑器拆分 2 x 2

- `Cmd + B` 打开或者关闭整个视图；
- `Cmd + J` 来打开或者关闭面板； 跟 Ctrl + ` 作用一样

#### 缩放

- `Cmd + +/-` 缩放整个工作区；

#### Markdown

- `命令面板中搜索 打开侧边预览` 可以一边编辑 markdown 文档一边预览

#### 参考文章

- [IntelliJ IDEA For Mac 快捷键](http://wiki.jikexueyuan.com/project/intellij-idea-tutorial/keymap-mac-introduce.html)

#### IntelliJ IDEA For Mac 快捷键

- 根据官方 pdf 翻译：[https://www.jetbrains.com/idea/docs/IntelliJIDEA_ReferenceCard_Mac.pdf](https://www.jetbrains.com/idea/docs/IntelliJIDEA_ReferenceCard_Mac.pdf)
- 在 IntelliJ IDEA 中有两个 Mac 版本的快捷键，一个叫做：Mac OS X，一个叫做：Mac OS X 10.5+
- 目前都是用：Mac OS X 10.5+
- 有两套的原因：[https://intellij-support.jetbrains.com/hc/en-us/community/posts/206159109-Updated-Mac-OS-X-keymap-Feedback-needed](https://intellij-support.jetbrains.com/hc/en-us/community/posts/206159109-Updated-Mac-OS-X-keymap-Feedback-needed)
  > 建议将 Mac 系统中与 IntelliJ IDEA 冲突的快捷键取消或更改，不建议改 IntelliJ IDEA 的默认快捷键。
