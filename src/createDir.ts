import axios from "axios"
import { resolve } from "path"
import { ensureDirSync } from "fs-extra"
import { createTmpl } from "./createTmpl"
import { lightBlue, red } from "kolorist"
import { onCreate } from "./createQuestion"
import { getRootPath } from "./common"

axios.defaults.baseURL = "https://api.github.com"

export async function createDir(name: string) {
  try {
    const res = await axios.get(
      "/repos/type-challenges/type-challenges/contents/questions"
    )
    if (res.data) {
      let filearr = res.data as any[]

      const isFindFileContent = filearr.find((item) => {
        const names = item.name.split("-")
        return names[0] === name
      })
      // 如果isFindFileContent,那就去创建文件夹 和内容
      if (isFindFileContent) {
        name = isFindFileContent.name
        const tmplDir = resolve(`${getRootPath()}/type-challenges`, name)
        ensureDirSync(tmplDir)

        createTmpl(tmplDir, name, "template")
        createTmpl(tmplDir, name, "test-cases")
        console.log(lightBlue(`题目${name}创建成功`))
      } else {
        // 不存在则可能没找到  重新创建
        aFreshCreate(name)
      }
    }
  } catch (error) {
    // aFreshCreate(name)
  }
}

function aFreshCreate(name) {
  console.log(red(`题目${name}可能没有找到`))
  return onCreate()
}
