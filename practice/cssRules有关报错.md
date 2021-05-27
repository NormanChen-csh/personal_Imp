cssRules和CSSStyleSheet有关报错

```
warningSecurityError: Failed to read the 'cssRules' property from 'CSSStyleSheet': Cannot access rules(anonymous) @ test-stylesheet.html:60
```

这个问题是64位的Chrome和IE9存在安全性的问题，无法获取外部文件，原因解释如下

[github](https://github.com/code-dot-org/code-dot-org/pull/21082)

[stackoverflow](https://stackoverflow.com/questions/49161159/uncaught-domexception-failed-to-read-the-rules-property-from-cssstylesheet/49161468)

目前解决办法是使用**try catch**