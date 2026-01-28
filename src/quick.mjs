import os from "os"
import { pickLatestZip } from "./autozip.mjs"
import { saveSession, listSessions, loadSession } from "./session.mjs"
import { unzip, ensureNoGit } from "./fs.mjs"
import { gitInit, gitAddAll, gitCommitMsg, gitRemoteSet, gitPushForce } from "./git.mjs"
import path from "path"
import fs from "fs-extra"

export async function quickReset(state){
  const zip=state.zip||pickLatestZip(path.join(os.homedir(),"Download"))||pickLatestZip(path.join(os.homedir(),"Downloads"))
  if(!zip)throw new Error("zip not found")
  const work=path.join(os.tmpdir(),"repocontrol_"+Date.now())
  fs.ensureDirSync(work)
  unzip(zip,work)
  ensureNoGit(work)
  state.workdir=work
  await gitInit(work)
  await gitAddAll(work)
  await gitCommitMsg(work,"quick reset")
  const url=state.repo.replace("https://","https://"+state.user+":"+state.token+"@")
  await gitRemoteSet(work,url)
  await gitPushForce(work,state.branch)
}

export function sessionSave(state){
  return saveSession(state)
}

export function sessionList(){
  return listSessions()
}

export function sessionLoad(file){
  return loadSession(file)
}