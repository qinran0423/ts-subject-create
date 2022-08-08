import { writeFileSync, ensureDirSync } from "fs-extra"
import { WriteFileOptions } from "fs"
import { blue } from "kolorist"
import { createConfig } from "./common"
import getPackageTmpl from "./template/packageTmpl"
import execa from "execa"
import { setName, InputType, getRootPath } from "./common"

export async function createProject(args) {
  let { name } = args
  if (!name) {
    const result = await setName(InputType.PROJECT)
    name = result.name
  }
  const config = createConfig({ name })
  ensureDirSync(name)
  const WRITE_FILE_OPTIONS: WriteFileOptions = { encoding: "utf-8" }
  // 1.创建package.json
  console.log(blue(`创建package.json`))
  writeFileSync(
    `${getRootPath(config)}/package.json`,
    getPackageTmpl(),
    WRITE_FILE_OPTIONS
  )
  // 2.创建type-challenges
  console.log(blue(`创建项目文件夹：type-challenges`))
  ensureDirSync(`${getRootPath(config)}/type-challenges`)
  // 默认创建hello world
  // await onCreate({ name: "00013", isDefault: true })
  // 3.安装依赖
  console.log(blue(`安装依赖`))
  console.log(getRootPath(config))
  execa("yarn", {
    cwd: getRootPath(config),
    stdio: [2, 2, 2]
  })
}
