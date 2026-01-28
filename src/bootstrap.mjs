import chalk from "chalk"
import prompts from "prompts"
import ora from "ora"
import fs from "fs-extra"
import path from "path"
import os from "os"
import { unzip, ensureNoGit, tree } from "./fs.mjs"
import { gitInit, gitAddAll, gitCommitMsg, gitRemoteSet, gitPushForce, gitPush } from "./git.mjs"
import { repoController } from "./controller.mjs"
import { presets } from "./presets.mjs"
import { applyDry } from "./dryrun.mjs"

export async function bootstrap(state){
  const mode=await prompts({
    type:"select",
    name:"m",
    message:"Mode",
    choices:[
      {title:"Interactive",value:"interactive"},
      {title:"Quick preset",value:"quick"},
      {title:"Safe preset",value:"safe"},
      {title:"Inspect only",value:"inspect"}
    ]
  })
  const dry=await prompts({type:"confirm",name:"v",message:"Dry run"})
  state.dry=!!dry.v

  if(mode.m==="interactive"){
    await repoController(state)
    return
  }

  const preset=presets[mode.m]
  if(!preset)return

  const work=path.join(os.tmpdir(),"repocontrol_"+Date.now())
  fs.ensureDirSync(work)
  const s1=ora("Extracting").start()
  unzip(state.zip,work)
  ensureNoGit(work)
  s1.succeed("Extracted")
  state.workdir=work

  if(mode.m==="inspect"){
    tree(work).slice(0,500).forEach(i=>console.log(i))
    return
  }

  const ginit=applyDry(state.dry,"git init",async()=>gitInit(work))
  const gcommit=applyDry(state.dry,"commit",async()=>{
    await gitAddAll(work)
    await gitCommitMsg(work,"preset upload")
  })
  const gpush=applyDry(state.dry,"push",async()=>{
    const url=state.repo.replace("https://","https://"+state.user+":"+state.token+"@")
    await gitRemoteSet(work,url)
    if(mode.m==="quick")await gitPushForce(work,state.branch)
    else await gitPush(work,state.branch)
  })

  const s2=ora("Init git").start()
  await ginit()
  s2.succeed("Git ready")

  const s3=ora("Commit").start()
  await gcommit()
  s3.succeed("Committed")

  const s4=ora("Push").start()
  await gpush()
  s4.succeed("Done")
}