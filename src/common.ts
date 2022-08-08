import * as inquirer from "inquirer"
import { resolve } from "path"

export const enum InputType {
  PROJECT,
  QUESTION
}

export function setName(type) {
  const description =
    type === InputType.QUESTION
      ? "(必填) 请输入题目名称"
      : "(必填) 请输入项目名称"
  return inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: description
    }
  ])
}

export function createConfig(answer) {
  const inputConfig = {
    packageName: answer.name
  }

  return inputConfig
}
// TODO 创建项目和创建问题
export function getRootPath({ packageName }) {
  return resolve(__dirname, `../${packageName}`)
}
