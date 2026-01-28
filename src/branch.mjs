import { execa } from "execa"

export async function listBranches(cwd){
  const r=await execa("git",["branch","-a"],{cwd})
  return r.stdout.split("\n").map(i=>i.trim()).filter(Boolean)
}

export async function createBranch(cwd,name){
  return execa("git",["checkout","-b",name],{cwd,stdio:"inherit"})
}

export async function switchBranch(cwd,name){
  return execa("git",["checkout",name],{cwd,stdio:"inherit"})
}

export async function deleteBranch(cwd,name){
  return execa("git",["branch","-D",name],{cwd,stdio:"inherit"})
}

export async function mergeBranch(cwd,name){
  return execa("git",["merge",name],{cwd,stdio:"inherit"})
}