# feicuiwb
>
共有2个分支，默认的master分支和开发分支dev
大家都切换到自己本地的dev分支，远程push也到dev

---------------------------------------
之后这个版本的修订，都在这里

## 常用的git命令
``` javascript
git add .
git commit -m 'msg'
git pull
git push
git branch
git checkout dev
git merge dev
```

操作步骤
1. 克隆项目  git clone git@github.com:dailliwang/feicuiwb.git
2. 切换到feicuiwb目录    cd feicuiwb
3. 创建并且切换到本地dev分支   git checkout -b dev
4. 建立本地dev分支和远程dev分支的联系  git branch --set-upstream-to=origin/dev
5. 拉取dev分支上面的内容,如果有不同步的内容   git pull
6. 在本地dev分支上面修改代码,然后  git add .   git commit -m 'msg'
7. 将本地dev分支内容推送到远程dev分支  git push
