import prompts from "prompts"
import { generateReadme } from "./readme.mjs"
import { health } from "./health.mjs"
import { diagnose } from "./diagnose.mjs"

export async function finalMenu(state){
  const r=await prompts({
    type:"select",
    name:"m",
    message:"Final",
    choices:[
      {title:"Generate RepoControl README",value:"readme"},
      {title:"Health Check",value:"health"},
      {title:"Diagnostics",value:"diag"},
      {title:"Back",value:"back"}
    ]
  })
  if(r.m==="readme"){
    const p=generateReadme(state)
    console.log("Generated:",p)
  }
  if(r.m==="health"){
    await health()
  }
  if(r.m==="diag"){
    const d=await diagnose()
    console.log(d)
  }
}