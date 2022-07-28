import axios from "axios"
import { resolve } from "path"
import { writeFileSync } from "fs-extra"
import { WriteFileOptions } from "fs"

axios.defaults.baseURL = "https://api.github.com"

const WRITE_FILE_OPTIONS: WriteFileOptions = { encoding: "utf-8" }
export async function createTmpl(tmplDir: string, name: string, file: string) {
  try {
    const res = await axios({
      url: `/repos/type-challenges/type-challenges/contents/questions/${name}/${file}.ts`,
      method: "get",
      headers: {
        accept: "application/vnd.github.v3.raw"
      }
    })
    const tmplFilePath = resolve(tmplDir, `${file}.ts`)
    writeFileSync(tmplFilePath, res.data, WRITE_FILE_OPTIONS)
  } catch (error) {
    console.log(error)
  }
}
