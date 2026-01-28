import { execa } from "execa"
import fs from "fs-extra"
import os from "os"

export async function diagnose(){
  const r={}
  try{
    const g=await execa("git",["--version"])
    r.git=g.stdout
  }catch{r.git=false}
  r.node=process.version
  r.platform=process.platform
  r.tmp=os.tmpdir()
  r.fs=fs.existsSync(r.tmp)
  return r
}