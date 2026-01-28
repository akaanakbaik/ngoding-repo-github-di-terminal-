import fs from "fs-extra"
import path from "path"
import os from "os"

const dir=path.join(os.homedir(),".repocontrol")
const file=path.join(dir,"config.json")

export function loadConfig(){
  if(!fs.existsSync(file))return {}
  return fs.readJsonSync(file)
}

export function saveConfig(cfg){
  fs.ensureDirSync(dir)
  fs.writeJsonSync(file,cfg,{spaces:2})
}

export function clearConfig(){
  if(fs.existsSync(file))fs.removeSync(file)
}