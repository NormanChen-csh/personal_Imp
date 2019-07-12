# 怎么上传一个自己的npm包？

## 简而言之5步

1. 前往npm官网注册一个账号（没被墙，很稳） https://www.npmjs.com
2. 进入到你的工程文件夹比如这样一个目录文件
```
  ---workspace
      |
      |---myModules
          |
          |---node_modules
          |   |---index.js
          |   |---package.json
          |---app.js
``` 

3. 在node_modules目录下使用命令npm init生成一个package.json文件
4. 在myModules文件夹目录下输入命令npm login登录npm，登录成功后再输入npm publish就将自己的包发送到npm服务器了
5. 随便打开一个工程npm install 你自己的包名。