import prompts from "prompts"
import { installGlobal } from "./installer.mjs"
import { quickReset, sessionSave, sessionList, sessionLoad } from "./quick.mjs"

export async function toolsMenu(state){
  const r=await prompts({
    type:"select",
    name:"m",
    message:"Tools",
    choices:[
      {title:"Quick Reset from Latest ZIP",value:"quick"},
      {title:"Save Session",value:"save"},
      {title:"Load Session",value:"load"},
      {title:"Install Global CLI",value:"install"},
      {title:"Back",value:"back"}
    ]
  })
  if(r.m==="quick")await quickReset(state)
  if(r.m==="save"){
    const f=sessionSave(state)
    console.log("Saved:",f)
  }
  if(r.m==="load"){
    const l=sessionList()
    if(!l.length)return
    const c=await prompts({type:"select",name:"v",message:"Session",choices:l.map(i=>({title:i,value:i}))})
    Object.assign(state,sessionLoad(c.v))
  }
  if(r.m==="install"){
    const p=await installGlobal()
    console.log("Installed:",p)
  }
}