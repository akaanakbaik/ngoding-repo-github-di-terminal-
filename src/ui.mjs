import chalk from "chalk"
import prompts from "prompts"
import ora from "ora"

export function banner(title,repo,branch){
  console.clear()
  console.log(chalk.cyan.bold(title))
  if(repo)console.log(chalk.gray("Repo:"),repo)
  if(branch)console.log(chalk.gray("Branch:"),branch)
}

export async function mainMenu(){
  const r=await prompts({
    type:"select",
    name:"m",
    message:"Menu",
    choices:[
      {title:"Status Repo",value:"status"},
      {title:"Show Tree",value:"tree"},
      {title:"Edit File",value:"edit"},
      {title:"Delete File",value:"del"},
      {title:"Rename File",value:"ren"},
      {title:"Git Log",value:"log"},
      {title:"Git Diff",value:"diff"},
      {title:"Clean Working Dir",value:"clean"},
      {title:"Reset Hard",value:"reset"},
      {title:"Pull",value:"pull"},
      {title:"Commit",value:"commit"},
      {title:"Force Push",value:"fpush"},
      {title:"Push",value:"push"},
      {title:"Back",value:"back"}
    ]
  })
  return r.m
}

export async function askFile(msg){
  const r=await prompts({type:"text",name:"v",message:msg})
  return r.v
}

export async function askText(msg){
  const r=await prompts({type:"text",name:"v",message:msg})
  return r.v
}

export async function askConfirm(msg){
  const r=await prompts({type:"confirm",name:"v",message:msg})
  return r.v
}

export function spin(msg){
  return ora(msg).start()
}

export function ok(s,msg){
  s.succeed(msg)
}

export function fail(s,msg){
  s.fail(msg)
}