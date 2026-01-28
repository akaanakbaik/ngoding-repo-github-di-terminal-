import prompts from "prompts"
import { stashList, stashSave, stashApply, stashDrop, stashPop } from "./stash.mjs"
import { listTags, createTag, deleteTag, pushTags } from "./release.mjs"
import { watchAutoCommit } from "./watcher.mjs"
import { listCommits, compareCommits } from "./history.mjs"
import { repoSize, gitStats } from "./stats.mjs"

export async function extraMenu(state){
  const r=await prompts({
    type:"select",
    name:"m",
    message:"Extras",
    choices:[
      {title:"Stash",value:"stash"},
      {title:"Tags/Release",value:"tag"},
      {title:"Auto Watch Commit",value:"watch"},
      {title:"History",value:"hist"},
      {title:"Stats",value:"stats"},
      {title:"Back",value:"back"}
    ]
  })
  if(r.m==="stash"){
    const a=await prompts({type:"select",name:"v",message:"Stash",choices:[
      {title:"List",value:"l"},{title:"Save",value:"s"},{title:"Apply",value:"a"},{title:"Pop",value:"p"},{title:"Drop",value:"d"}
    ]})
    if(a.v==="l")console.log(await stashList(state.workdir))
    if(a.v==="s")await stashSave(state.workdir,"stash")
    if(a.v==="a")await stashApply(state.workdir)
    if(a.v==="p")await stashPop(state.workdir)
    if(a.v==="d")await stashDrop(state.workdir)
  }
  if(r.m==="tag"){
    const a=await prompts({type:"select",name:"v",message:"Tag",choices:[
      {title:"List",value:"l"},{title:"Create",value:"c"},{title:"Delete",value:"d"},{title:"Push Tags",value:"p"}
    ]})
    if(a.v==="l")(await listTags(state.workdir)).forEach(i=>console.log(i))
    if(a.v==="c"){
      const n=await prompts({type:"text",name:"v",message:"Tag name"})
      await createTag(state.workdir,n.v)
    }
    if(a.v==="d"){
      const n=await prompts({type:"text",name:"v",message:"Tag name"})
      await deleteTag(state.workdir,n.v)
    }
    if(a.v==="p")await pushTags(state.workdir)
  }
  if(r.m==="watch"){
    watchAutoCommit(state.workdir)
    console.log("watching")
  }
  if(r.m==="hist"){
    const l=await listCommits(state.workdir)
    l.forEach(i=>console.log(i))
    const c=await prompts({type:"confirm",name:"v",message:"Compare two commits"})
    if(c.v){
      const a=await prompts({type:"text",name:"v",message:"From"})
      const b=await prompts({type:"text",name:"v",message:"To"})
      console.log(await compareCommits(state.workdir,a.v,b.v))
    }
  }
  if(r.m==="stats"){
    const s=repoSize(state.workdir)
    const g=await gitStats(state.workdir)
    console.log({size:s,commits:g.commits,branches:g.branches})
  }
}