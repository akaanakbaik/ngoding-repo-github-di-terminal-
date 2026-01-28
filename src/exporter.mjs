import fs from "fs-extra"
import path from "path"
import os from "os"

export function exportLog(lines,name="repocontrol.log"){
  const p=path.join(os.homedir(),name)
  fs.writeFileSync(p,lines.join("\n"))
  return p
}

export function collect(lines,msg){
  lines.push(msg)
}