import fs from "fs-extra"
import path from "path"
import os from "os"

export function backupDir(src){
  const dst=path.join(os.tmpdir(),"repocontrol_backup_"+Date.now())
  fs.copySync(src,dst)
  return dst
}

export function restoreDir(backup,src){
  fs.removeSync(src)
  fs.copySync(backup,src)
}