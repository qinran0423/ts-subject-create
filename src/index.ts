#!/usr/bin/env node

import { Command } from "commander"
import { onCreate } from "./create"
import { blue } from "kolorist"
import { writeFileSync, ensureDirSync } from "fs-extra"
import { WriteFileOptions } from "fs"
import getPackageTmpl from "./template/packageTmpl"
import { resolve } from "path"
import * as inquirer from "inquirer"
import { createConfig } from "./config"
import execa from 'execa';

createProject()

let config
async function createProject() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "packageName",
      message: "set package name",
      validate(val) {
        if (val) return true
        return "Please enter package name"
      }
    }
  ])

  config = createConfig(answer)


  // 1. 创建项目
  ensureDirSync(config.packageName)
  const WRITE_FILE_OPTIONS: WriteFileOptions = { encoding: "utf-8" }
  // 1.创建package.json
  console.log(blue(`创建package.json`))
  writeFileSync(`${getRootPath()}/package.json`, getPackageTmpl(), WRITE_FILE_OPTIONS)
  // 2.创建type-challenges
  console.log(blue(`创建项目文件夹：type-challenges`))
  ensureDirSync(`${getRootPath()}/type-challenges`)
  // 默认创建hello world
  await onCreate({name: '00013', isDefault: true})
  // 3.安装依赖
  console.log(blue(`安装依赖`))
  execa("yarn", {
    cwd: getRootPath(),
    stdio: [2, 2, 2],
  });
  
}

// console.log(config);

// 创建命令对象
const program = new Command()

// 注册命令、参数、回调
program
  .command("create")
  .description("创建一个type-challenges题目")
  .option("-n --name <name>", "创建题目名称")
  .action(onCreate)

// 执行命令行参数解析
program.parse()

export function getRootPath() {
  
  return resolve(__dirname, `../${config.packageName}`)
}
