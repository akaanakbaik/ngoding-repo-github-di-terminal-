import fs from "fs-extra"
import path from "path"

export function findZips(dir){
  if(!fs.existsSync(dir))return []
  return fs.readdirSync(dir).filter(i=>i.toLowerCase().endsWith(".zip")).map(i=>path.join(dir,i))
}

export function pickLatestZip(dir){
  const z=findZips(dir)
  if(!z.length)return null
  return z.map(p=>({p,t:fs.statSync(p).mtimeMs})).sort((a,b)=>b.t-a.t)[0].p
}