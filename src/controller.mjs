import { gitStatus, gitLog, gitDiff, gitClean, gitResetHard, gitPull, gitAddAll, gitCommitMsg, gitPushForce, gitPush } from "./git.mjs"
import { tree, countFiles, writeFile, readFile, removePath, renamePath } from "./fs.mjs"
import { mainMenu, askFile, askText, askConfirm, spin, ok, fail } from "./ui.mjs"
import chalk from "chalk"
import fs from "fs-extra"
import path from "path"

export async function repoController(state){
  while(true){
    const m=await mainMenu()
    try{
      if(m==="status"){
        const r=await gitStatus(state.workdir)
        console.log(r.stdout)
        console.log("Files:",countFiles(state.workdir))
      }
      if(m==="tree"){
        tree(state.workdir).slice(0,500).forEach(i=>console.log(i))
      }
      if(m==="edit"){
        const f=await askFile("File path")
        const p=path.join(state.workdir,f)
        const cur=fs.existsSync(p)?readFile(state.workdir,f):""
        const t=await askText("New content")
        writeFile(state.workdir,f,t||cur)
      }
      if(m==="del"){
        const f=await askFile("Delete file")
        if(await askConfirm("Confirm delete"))removePath(state.workdir,f)
      }
      if(m==="ren"){
        const a=await askFile("From")
        const b=await askFile("To")
        renamePath(state.workdir,a,b)
      }
      if(m==="log"){
        const r=await gitLog(state.workdir)
        console.log(r.stdout)
      }
      if(m==="diff"){
        const r=await gitDiff(state.workdir)
        console.log(r.stdout)
      }
      if(m==="clean"){
        if(await askConfirm("Clean untracked files"))await gitClean(state.workdir)
      }
      if(m==="reset"){
        if(await askConfirm("Reset hard"))await gitResetHard(state.workdir)
      }
      if(m==="pull"){
        const s=spin("Pulling")
        await gitPull(state.workdir)
        ok(s,"Pulled")
      }
      if(m==="commit"){
        const msg=await askText("Commit message")
        const s=spin("Committing")
        await gitAddAll(state.workdir)
        await gitCommitMsg(state.workdir,msg||"update")
        ok(s,"Committed")
      }
      if(m==="fpush"){
        if(!await askConfirm("Force push replace repo"))continue
        const s=spin("Force pushing")
        await gitPushForce(state.workdir,state.branch)
        ok(s,"Force pushed")
      }
      if(m==="push"){
        const s=spin("Pushing")
        await gitPush(state.workdir,state.branch)
        ok(s,"Pushed")
      }
      if(m==="back")break
    }catch(e){
      console.log(chalk.red("Error"),e.message)
    }
  }
}