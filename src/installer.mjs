import fs from "fs-extra"
import path from "path"
import os from "os"
import { execa } from "execa"

export async function installGlobal(){
  const binDir=process.platform==="win32"?path.join(process.env.APPDATA||os.homedir(),"npm"):path.join(os.homedir(),".local","bin")
  fs.ensureDirSync(binDir)
  const src=path.resolve(process.cwd(),"index.mjs")
  const dst=path.join(binDir,"repocontrol")
  if(process.platform!=="win32")await execa("chmod",["+x",src])
  fs.copySync(src,dst)
  return dst
}