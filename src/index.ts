#!/usr/bin/env node

import { Command } from "commander"
import { onCreate } from "./createQuestion"
import { createProject } from "./createProject"

// 创建命令对象
const program = new Command()

// 注册命令、参数、回调
program
  .command("init")
  .description("创建一个type-challenges项目")
  .option("-n --name <name>", "创建项目名称")
  .action(createProject)

program
  .command("setup")
  .description("创建一个type-challenges题目")
  .option("-n --name <name>", "创建题目名称")
  .action(onCreate)
// 执行命令行参数解析
program.parse()
