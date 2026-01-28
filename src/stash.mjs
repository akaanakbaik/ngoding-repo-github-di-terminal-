import { execa } from "execa"

export async function stashList(cwd){
  const r=await execa("git",["stash","list"],{cwd})
  return r.stdout
}

export async function stashSave(cwd,msg){
  return execa("git",["stash","push","-m",msg||"stash"],{cwd,stdio:"inherit"})
}

export async function stashApply(cwd,ref){
  return execa("git",["stash","apply",ref||"stash@{0}"],{cwd,stdio:"inherit"})
}

export async function stashDrop(cwd,ref){
  return execa("git",["stash","drop",ref||"stash@{0}"],{cwd,stdio:"inherit"})
}

export async function stashPop(cwd,ref){
  return execa("git",["stash","pop",ref||"stash@{0}"],{cwd,stdio:"inherit"})
}