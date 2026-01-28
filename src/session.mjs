import fs from "fs-extra"
import path from "path"
import os from "os"

const dir=path.join(os.tmpdir(),"repocontrol_sessions")

export function saveSession(state){
  fs.ensureDirSync(dir)
  const f=path.join(dir,Date.now()+".json")
  fs.writeJsonSync(f,state)
  return f
}

export function listSessions(){
  if(!fs.existsSync(dir))return []
  return fs.readdirSync(dir).map(i=>path.join(dir,i))
}

export function loadSession(file){
  return fs.readJsonSync(file)
}