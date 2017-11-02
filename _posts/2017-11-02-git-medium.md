---
layout:     post
title:      "git的使用教程(二)"
subtitle:   "git的中级教程(其他常用操作)"
date:       2017-11-02
author:     "toshiba"
header-img: "images/bg/batman/bat30.jpg"
tags:
    - 工具
    - git

categories:
    - 技术文章

comments: true
---

## git的中级使用教程

记录一些使用率中等的git命令

### 设置用户名和邮箱
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

```

### 配置别名
使用git status 太长了怎么破
```
$ git config --global alias.st status
$ git config --global alias.co checkout
$ git config --global alias.ci commit
$ git config --global alias.br branch
$ git config --global alias.unstage 'reset HEAD'
$ git config --global alias.last 'log -1'  //显示最后一次提交信息
```

还有这种操作
```
$ git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```
结果如下
![](https://darknights.b0.upaiyun.com/assets/images/in-post/git-medium/0.png)


### git reset的后悔药
当使用  <code>git reset --hard xxx</code> 回退到之前的版本,我又想回到最新的版本如何操作呢

```
$ git reflog


ea34578 HEAD@{0}: reset: moving to HEAD^
3628164 HEAD@{1}: commit: append GPL
ea34578 HEAD@{2}: commit: add distributed
cb926e7 HEAD@{3}: commit (initial): wrote a readme file

```
这样之后又可以使用 reset --hard xxx 乘坐时光机返回了。



### 生产SSH Key

```
$ ssh-keygen -t rsa -C "youremail@example.com"

//生产的公钥私钥 会放到服务器的 .ssh/authorized_keys目录下

```

### 本地文件夹添加远程仓库并且推送上去
基础文章已经写过这里再次复习一遍
```
$ git remote add origin git@github.com:michaelliao/learngit.git

$ git push -u origin master

```

### 分支管理策略<code>--no-ff</code>

通常，合并分支时，如果可能，Git会用<code>Fast forward模式</code>，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用<code>Fast forward</code>模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

```
$ git merge --no-ff -m "merge with no-ff" dev
Merge made by the 'recursive' strategy.
 readme.txt |    1 +
 1 file changed, 1 insertion(+)

 //其他操作一样只是合并的时候可以带上 禁用ff模式并且加上注释。
```

合并后的结果如下
```
$ git log --graph --pretty=oneline --abbrev-commit
*   7825a50 merge with no-ff
|\
| * 6224937 add merge
|/
*   59bc1cb conflict fixed
...
```

### 保存工作现场
```
$ git stash
Saved working directory and index state WIP on dev: 6224937 add merge
HEAD is now at 6224937 add merge

$ git stash list  //显示stash列表

$ git stash pop   //相当于 git stash apply + git stash drop   恢复最近的一条


$ git stash apply stash@{0} //指定要恢复的stash

```

### 本地分支与远程分支对应
要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是用这个命令创建本地dev分支：
```
$ git checkout -b dev origin/dev


如果此时报错 no tracking information 需要将远程dev和本地dev分支建立链接

$ git branch --set-upstream dev origin/dev

//也可以选择git fetch 将远程相关的内容全拉取下来然后直接切换分支

```

### 配置文件
配置Git的时候，加上--global是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用
每个仓库的Git配置文件都放在.git/config文件中
```
$ cat .git/config
[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
    ignorecase = true
    precomposeunicode = true
[remote "origin"]
    url = git@github.com:michaelliao/learngit.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
    remote = origin
    merge = refs/heads/master
[alias]
    last = log -1
```

前用户的Git配置文件放在用户主目录下的一个隐藏文件.gitconfig中
```
$ cd ~
$ cat .gitconfig
[alias]
    co = checkout
    ci = commit
    br = branch
    st = status
[user]
    name = Your Name
    email = your@email.com
```

### 使用.gitignore
有些时候，你想添加一个文件到Git，但发现添加不了，原因是这个文件被.gitignore忽略了：
如果你确实想添加该文件，可以用-f强制添加到Git：
或者你发现，可能是.gitignore写得有问题，需要找出来到底哪个规则写错了，可以用git check-ignore命令检查

```
$ git add -f App.class

$ git check-ignore -v App.class
.gitignore:3:*.class    App.class
```


### 参考文章

> * [git - 简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)
> * [git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
