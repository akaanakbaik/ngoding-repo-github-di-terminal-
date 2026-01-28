import { runHook } from "./plugins.mjs"

export async function beforeCommit(state){
  await runHook("beforeCommit",state)
}

export async function afterCommit(state){
  await runHook("afterCommit",state)
}

export async function beforePush(state){
  await runHook("beforePush",state)
}

export async function afterPush(state){
  await runHook("afterPush",state)
}