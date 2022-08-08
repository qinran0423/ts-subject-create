#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var commander_1 = require("commander");
var createQuestion_1 = require("./createQuestion");
var createProject_1 = require("./createProject");
// 创建命令对象
var program = new commander_1.Command();
// 注册命令、参数、回调
program
    .command("create")
    .description("创建一个type-challenges项目")
    .option('-n --name <name>', '创建项目名称')
    .action(createProject_1.createProject);
program
    .command("question")
    .description("创建一个type-challenges题目")
    .option('-n --name <name>', '创建题目名称')
    .action(createQuestion_1.onCreate);
// 执行命令行参数解析
program.parse();
