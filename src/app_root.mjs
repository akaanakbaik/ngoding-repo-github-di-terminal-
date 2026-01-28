import { banner } from "./ui.mjs"
import { rootMenu } from "./menu.mjs"
import { repoController } from "./controller.mjs"
import { searchFlow, replaceFlow, branchFlow, configFlow } from "./integrations.mjs"
import { exportLog } from "./exporter.mjs"
import { logger } from "./logger.mjs"
import { loadPlugins } from "./plugins.mjs"
import { extraMenu } from "./menu_extra.mjs"

export async function appRoot(state){
  while(true){
    banner("RepoControl",state.repo,state.branch)
    const m=await rootMenu()
    if(m==="controller")await repoController(state)
    if(m==="search")await searchFlow(state)
    if(m==="replace")await replaceFlow(state)
    if(m==="branch")await branchFlow(state)
    if(m==="config")await configFlow()
    if(m==="export"){
      const p=exportLog(logger.dump())
      console.log("Saved:",p)
    }
    if(m==="plugins"){
      state.plugins=loadPlugins(process.cwd()+"/plugins")
      console.log("Plugins:",state.plugins.length)
    }
    if(m==="exit")process.exit(0)
  }
}