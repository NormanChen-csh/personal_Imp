# git 日常使用

## 1. 使用sourceTree merge分支之后，无法revert merge

* 先git reset --hard 到此分支merge前的最新一次提交，这时候会显示合并的另一个分支的几个拉取，不用管，直接git reset到之前merge的那次提交，你的暂存区就会出现另一个合并分支的提交修改文件，再清空就好了
* 直接git revert 指定merge提交，然后在push的时候用--force就行了

## 2. 本地github项目
git config --global --unset http.proxy 
git config --global --unset https.proxy 