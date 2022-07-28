# ts类型体操题目创建

## 介绍
之前在刷`type-challenges`的时候，为了记录自己的学习过程，每次都要创建一个题目，有题目内容`template.ts`， 和测试文件`test-cases.ts`。所以写了一个cli根据`type-challenges`中的题目序号自动创建这两个文件。

这个cli目前还有点缺陷，你的项目当中必须安装了`@type-challenges/utils`，以及根目录下要有`type-challenges`文件夹，当执行相关的命令，题目自动会创建到`type-challenges`文件夹中。
## 安装
```js
npm install -g ts-subject-create
```

## 使用
```js
ts-subject-create create
```

会提示输入type-challenges中的题目序号，把`type-challenges`的`questions`中对应的题号输入即可
