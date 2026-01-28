import fs from "fs-extra"
import path from "path"
import { execa } from "execa"

export function repoSize(dir){
  let s=0
  walk(dir,p=>{
    const st=fs.statSync(p)
    if(st.isFile())s+=st.size
  })
  return s
}

export async function gitStats(cwd){
  const a=await execa("git",["rev-list","--count","HEAD"],{cwd})
  const b=await execa("git",["branch","--list"],{cwd})
  return {commits:parseInt(a.stdout||"0"),branches:b.stdout.split("\n").filter(Boolean).length}
}

function walk(dir,cb){
  for(const i of fs.readdirSync(dir)){
    const p=path.join(dir,i)
    cb(p)
    if(fs.statSync(p).isDirectory())walk(p,cb)
  }
}