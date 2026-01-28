import { searchText, replaceText } from "./search.mjs"
import { listBranches, createBranch, switchBranch, deleteBranch, mergeBranch } from "./branch.mjs"
import { loadConfig, saveConfig, clearConfig } from "./config.mjs"
import { askText, askConfirm } from "./ui.mjs"
import fs from "fs-extra"

export async function searchFlow(state){
  const q=await askText("Search text")
  const res=searchText(state.workdir,q)
  res.forEach(i=>console.log(i))
}

export async function replaceFlow(state){
  const a=await askText("Find")
  const b=await askText("Replace")
  if(await askConfirm("Replace all"))replaceText(state.workdir,a,b)
}

export async function branchFlow(state){
  const list=await listBranches(state.workdir)
  list.forEach(i=>console.log(i))
  const m=await askText("Action create/switch/delete/merge")
  if(m==="create"){
    const n=await askText("Branch name")
    await createBranch(state.workdir,n)
  }
  if(m==="switch"){
    const n=await askText("Branch name")
    await switchBranch(state.workdir,n)
  }
  if(m==="delete"){
    const n=await askText("Branch name")
    if(await askConfirm("Confirm delete"))await deleteBranch(state.workdir,n)
  }
  if(m==="merge"){
    const n=await askText("Merge branch")
    await mergeBranch(state.workdir,n)
  }
}

export async function configFlow(){
  const c=loadConfig()
  console.log(c)
  const m=await askText("set/clear/exit")
  if(m==="set"){
    const k=await askText("Key")
    const v=await askText("Value")
    c[k]=v
    saveConfig(c)
  }
  if(m==="clear"){
    clearConfig()
  }
}