import prompts from "prompts"
import { bootstrap } from "./bootstrap.mjs"
import { appRoot } from "./app_root.mjs"

export async function main(){
  const state={
    user:null,
    token:null,
    repo:null,
    branch:"main",
    zip:null,
    workdir:null,
    plugins:[],
    dry:false
  }

  const r=await prompts([
    {type:"text",name:"user",message:"GitHub Username"},
    {type:"password",name:"token",message:"GitHub Token"},
    {type:"text",name:"repo",message:"Repo URL"},
    {type:"text",name:"branch",message:"Branch",initial:"main"},
    {type:"text",name:"zip",message:"ZIP path"}
  ])
  Object.assign(state,r)

  await bootstrap(state)
  await appRoot(state)
}