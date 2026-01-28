import { execa } from "execa"

export async function compareCommits(cwd,a,b){
  const r=await execa("git",["--no-pager","diff",`${a}..${b}`],{cwd})
  return r.stdout
}

export async function listCommits(cwd,limit=20){
  const r=await execa("git",["--no-pager","log","--oneline",`-${limit}`],{cwd})
  return r.stdout.split("\n").filter(Boolean)
}