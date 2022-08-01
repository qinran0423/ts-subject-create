import * as inquirer from "inquirer"
import { red } from "kolorist"
import { readdirSync } from "node:fs"
import { getRootPath } from "."
import { createDir } from "./createDir"


interface obj {
  name: string,
  isDefault: boolean
}
export async function onCreate(args: obj = { name: "", isDefault: false }) {
  let { name,isDefault } = args
  console.log(name, isDefault);
  if (!(name && isDefault)) {
    const result = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "(必填) 请输入题目名称"
      }
    ])
    name = result.name
  }

  const dirs = await readdirSync(`${getRootPath()}/type-challenges`)
  // 先看看有没有重复创建的
  const hasCreate = dirs.findIndex((item) => {
    const names = item.split("-")
    return names[0] == name
  })
  if (hasCreate > -1) {
    const result = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: red(`×题目${name}已经被创建， 请重新输入`)
      }
    ])
    name = result.name
  }

  createDir(name, isDefault)
}



