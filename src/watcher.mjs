import fs from "fs-extra"
import path from "path"
import { execa } from "execa"

export function watchAutoCommit(dir,opts={}){
  const delay=opts.delay||2000
  let t=null
  const seen=new Set()
  const scan=()=>{
    walk(dir,(p)=>{
      if(!seen.has(p)){
        seen.add(p)
        schedule()
      }
    })
  }
  const schedule=()=>{
    if(t)clearTimeout(t)
    t=setTimeout(run,delay)
  }
  const run=async()=>{
    try{
      await execa("git",["add","."],{cwd:dir})
      await execa("git",["commit","-m","auto-commit"],{cwd:dir})
    }catch{}
  }
  scan()
  fs.watch(dir,{recursive:true},()=>schedule())
}

function walk(dir,cb){
  for(const i of fs.readdirSync(dir)){
    const p=path.join(dir,i)
    cb(p)
    if(fs.statSync(p).isDirectory())walk(p,cb)
  }
}