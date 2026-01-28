import fs from "fs-extra"
import path from "path"

export function searchText(dir,query,limit=1000){
  const res=[]
  walk(dir,(p)=>{
    const s=fs.statSync(p)
    if(s.isFile()){
      const t=fs.readFileSync(p,"utf8")
      if(t.includes(query))res.push(p)
    }
  })
  return res.slice(0,limit)
}

export function replaceText(dir,from,to){
  walk(dir,(p)=>{
    const s=fs.statSync(p)
    if(s.isFile()){
      const t=fs.readFileSync(p,"utf8")
      if(t.includes(from)){
        fs.writeFileSync(p,t.split(from).join(to))
      }
    }
  })
}

function walk(dir,cb){
  for(const i of fs.readdirSync(dir)){
    const p=path.join(dir,i)
    cb(p)
    if(fs.statSync(p).isDirectory())walk(p,cb)
  }
}