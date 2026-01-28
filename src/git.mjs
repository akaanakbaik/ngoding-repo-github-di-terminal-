import { execa } from "execa"

export async function git(cwd,args){
  return execa("git",args,{cwd,stdio:"inherit"})
}

export async function gitStatus(cwd){
  return execa("git",["status","-sb"],{cwd})
}

export async function gitLog(cwd){
  return execa("git",["--no-pager","log","--oneline","-10"],{cwd})
}

export async function gitDiff(cwd){
  return execa("git",["--no-pager","diff"],{cwd})
}

export async function gitClean(cwd){
  return execa("git",["clean","-fd"],{cwd,stdio:"inherit"})
}

export async function gitResetHard(cwd){
  return execa("git",["reset","--hard"],{cwd,stdio:"inherit"})
}

export async function gitCheckout(cwd,branch){
  return execa("git",["checkout","-B",branch],{cwd,stdio:"inherit"})
}

export async function gitPull(cwd){
  return execa("git",["pull","--rebase"],{cwd,stdio:"inherit"})
}

export async function gitAddAll(cwd){
  return execa("git",["add","."],{cwd,stdio:"inherit"})
}

export async function gitCommitMsg(cwd,msg){
  return execa("git",["commit","-m",msg],{cwd,stdio:"inherit"})
}

export async function gitRemoteSet(cwd,url){
  try{await execa("git",["remote","remove","origin"],{cwd})}catch{}
  return execa("git",["remote","add","origin",url],{cwd,stdio:"inherit"})
}

export async function gitPushForce(cwd,branch){
  return execa("git",["push","-u","origin",branch,"--force"],{cwd,stdio:"inherit"})
}

export async function gitPush(cwd,branch){
  return execa("git",["push","-u","origin",branch],{cwd,stdio:"inherit"})
}