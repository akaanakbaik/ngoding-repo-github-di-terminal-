import fs from "fs-extra"
import path from "path"

export function pack(){
  const out=path.join(process.cwd(),"repocontrol.bundle.json")
  const files=[]
  walk(process.cwd(),p=>{
    if(p.includes("node_modules"))return
    if(fs.statSync(p).isFile())files.push(p)
  })
  fs.writeJsonSync(out,{files},{spaces:2})
  return out
}

function walk(dir,cb){
  for(const i of fs.readdirSync(dir)){
    const p=path.join(dir,i)
    cb(p)
    if(fs.statSync(p).isDirectory())walk(p,cb)
  }
}