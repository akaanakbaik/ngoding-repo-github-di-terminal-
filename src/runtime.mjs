import { banner } from "./ui.mjs"
import { wire, quickAction } from "./wire.mjs"
import { listenKeys } from "./keybind.mjs"

export async function runtime(state){
  banner("RepoControl",state.repo,state.branch)
  listenKeys({
    q:()=>quickAction(state,"q"),
    r:()=>quickAction(state,"r"),
    s:()=>quickAction(state,"s"),
    b:()=>quickAction(state,"b"),
    t:()=>quickAction(state,"t"),
    e:()=>quickAction(state,"e"),
    h:()=>quickAction(state,"h")
  })
  await wire(state)
}