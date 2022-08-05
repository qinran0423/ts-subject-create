import { writeFileSync, ensureDirSync } from "fs-extra"
import { WriteFileOptions } from "fs"
import { blue } from "kolorist"
import { resolve } from "path"
import { createConfig } from "./config"
import getPackageTmpl from "./template/packageTmpl"
// import { onCreate } from "./create"
import execa from "execa"

let config
export function createProject ({name}) {
  config = createConfig({name})
  ensureDirSync(name)
  const WRITE_FILE_OPTIONS: WriteFileOptions = { encoding: "utf-8" }
  // 1.创建package.json
  console.log(blue(`创建package.json`))
  writeFileSync(
    `${getRootPath()}/package.json`,
    getPackageTmpl(),
    WRITE_FILE_OPTIONS
  )
  // 2.创建type-challenges
  console.log(blue(`创建项目文件夹：type-challenges`))
  ensureDirSync(`${getRootPath()}/type-challenges`)
    // 默认创建hello world
  // await onCreate({ name: "00013", isDefault: true })
  // 3.安装依赖
  console.log(blue(`安装依赖`))
  execa("yarn", {
    cwd: getRootPath(),
    stdio: [2, 2, 2]
  })
}


export function getRootPath() {
  return resolve(__dirname, `../${config.packageName}`)
}
