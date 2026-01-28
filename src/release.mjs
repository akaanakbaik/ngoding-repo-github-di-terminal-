import { execa } from "execa"

export async function listTags(cwd){
  const r=await execa("git",["tag"],{cwd})
  return r.stdout.split("\n").filter(Boolean)
}

export async function createTag(cwd,name,msg){
  return execa("git",["tag","-a",name,"-m",msg||name],{cwd,stdio:"inherit"})
}

export async function deleteTag(cwd,name){
  return execa("git",["tag","-d",name],{cwd,stdio:"inherit"})
}

export async function pushTags(cwd){
  return execa("git",["push","--tags"],{cwd,stdio:"inherit"})
}