import * as inquirer from "inquirer"
import { red } from "kolorist"
import { readdirSync } from "node:fs"
import { setName, InputType, createConfig, getRootPath } from "./common"
import { createDir } from "./createDir"

interface obj {
  name: string
}
export async function onCreate(args: obj = { name: "" }) {
  let { name } = args
  if (!name) {
    const result = await setName(InputType.QUESTION)
    name = result.name
  }
  const filearr = process.cwd().split("/")
  const projectName = filearr[filearr.length - 1]
  const config = createConfig({ name: projectName })
  console.log(getRootPath(config), config)
  const dirs = await readdirSync(`${getRootPath(config)}/type-challenges`)
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

  createDir(name, config)
}
