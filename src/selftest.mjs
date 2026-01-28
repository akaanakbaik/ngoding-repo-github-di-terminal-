import fs from "fs-extra"
import path from "path"
import os from "os"
import { unzip } from "./fs.mjs"

export async function selfTest(){
  const tmp=path.join(os.tmpdir(),"repocontrol_selftest_"+Date.now())
  fs.ensureDirSync(tmp)
  const ok=fs.existsSync(tmp)
  return {tmp,ok}
}