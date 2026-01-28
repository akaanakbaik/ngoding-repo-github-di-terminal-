import fs from "fs-extra"
import path from "path"

export function loadPlugins(dir){
  if(!fs.existsSync(dir))return []
  return fs.readdirSync(dir).filter(i=>i.endsWith(".mjs")).map(i=>path.join(dir,i))
}

export async function runHook(hook,ctx){
  if(!ctx.plugins)return
  for(const p of ctx.plugins){
    const mod=await import(p)
    if(mod[hook])await mod[hook](ctx)
  }
}