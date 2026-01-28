import { rootMenu } from "./menu.mjs"
import { repoController } from "./controller.mjs"
import { searchFlow, replaceFlow, branchFlow, configFlow } from "./integrations.mjs"
import { extraMenu } from "./menu_extra.mjs"
import { toolsMenu } from "./menu_tools.mjs"
import { help } from "./help.mjs"

export async function wire(state){
  while(true){
    const m=await rootMenu()
    if(m==="controller")await repoController(state)
    if(m==="search")await searchFlow(state)
    if(m==="replace")await replaceFlow(state)
    if(m==="branch")await branchFlow(state)
    if(m==="config")await configFlow()
    if(m==="export"){}
    if(m==="plugins"){}
    if(m==="exit")process.exit(0)
  }
}

export async function quickAction(state,k){
  if(k==="r")await repoController(state)
  if(k==="s")await searchFlow(state)
  if(k==="b")await branchFlow(state)
  if(k==="t")await toolsMenu(state)
  if(k==="e")await extraMenu(state)
  if(k==="h")help()
  if(k==="q")process.exit(0)
}