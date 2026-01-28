import chalk from "chalk"
import prompts from "prompts"
import ora from "ora"
import fs from "fs-extra"
import path from "path"
import os from "os"
import { execa } from "execa"
import AdmZip from "adm-zip"

const state={
  user:null,
  token:null,
  repo:null,
  branch:"main",
  zip:null,
  workdir:null,
  ready:false
}

const cwd=process.cwd()

async function inputAuth(){
  const r=await prompts([
    {type:"text",name:"user",message:"GitHub Username"},
    {type:"password",name:"token",message:"GitHub Token"},
    {type:"text",name:"repo",message:"Repo URL"}
  ])
  state.user=r.user
  state.token=r.token
  state.repo=r.repo
}

async function inputZip(){
  const r=await prompts({
    type:"text",
    name:"zip",
    message:"Path ZIP"
  })
  state.zip=r.zip
}

function validateZip(){
  if(!fs.existsSync(state.zip))throw new Error("ZIP not found")
}

async function extractZip(){
  const base=path.join(os.tmpdir(),"repocontrol_"+Date.now())
  fs.ensureDirSync(base)
  const zip=new AdmZip(state.zip)
  zip.extractAllTo(base,true)
  state.workdir=base
}

async function git(cmd,args){
  return execa(cmd,args,{cwd:state.workdir,stdio:"inherit"})
}

async function gitInit(){
  await git("git",["init"])
  await git("git",["branch","-M",state.branch])
}

async function gitCommit(){
  await git("git",["add","."])
  await git("git",["commit","-m","repo reset upload"])
}

async function gitPush(){
  const url=state.repo.replace("https://","https://"+state.user+":"+state.token+"@")
  await git("git",["remote","add","origin",url])
  await git("git",["push","-u","origin",state.branch,"--force"])
}

async function menu(){
  const r=await prompts({
    type:"select",
    name:"m",
    message:"RepoControl",
    choices:[
      {title:"Login GitHub",value:1},
      {title:"Load ZIP",value:2},
      {title:"Extract ZIP",value:3},
      {title:"Init Git",value:4},
      {title:"Commit",value:5},
      {title:"Force Push",value:6},
      {title:"Exit",value:0}
    ]
  })
  return r.m
}

export async function runApp(){
  console.clear()
  console.log(chalk.cyan.bold("RepoControl CLI"))
  while(true){
    const m=await menu()
    try{
      if(m===1)await inputAuth()
      if(m===2)await inputZip()
      if(m===3){
        validateZip()
        const s=ora("Extracting").start()
        await extractZip()
        s.succeed("Extracted")
      }
      if(m===4){
        const s=ora("Init git").start()
        await gitInit()
        s.succeed("Git ready")
      }
      if(m===5){
        const s=ora("Commit").start()
        await gitCommit()
        s.succeed("Committed")
      }
      if(m===6){
        const c=await prompts({type:"confirm",name:"ok",message:"Force push and replace repo?"})
        if(!c.ok)continue
        const s=ora("Pushing").start()
        await gitPush()
        s.succeed("Repo replaced")
      }
      if(m===0)process.exit(0)
    }catch(e){
      console.log(chalk.red("Error"),e.message)
    }
  }
}