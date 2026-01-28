import fs from "fs-extra"
import path from "path"
import os from "os"
import AdmZip from "adm-zip"

export function tmpdir(name){
  const p=path.join(os.tmpdir(),name+"_"+Date.now())
  fs.ensureDirSync(p)
  return p
}

export function ensureNoGit(dir){
  const g=path.join(dir,".git")
  if(fs.existsSync(g))fs.removeSync(g)
}

export function unzip(zipPath,target){
  const z=new AdmZip(zipPath)
  z.extractAllTo(target,true)
}

export function tree(dir,base="",out=[]){
  const items=fs.readdirSync(dir)
  for(const i of items){
    const p=path.join(dir,i)
    const r=path.join(base,i)
    if(fs.statSync(p).isDirectory()){
      out.push(r+"/")
      tree(p,r,out)
    }else out.push(r)
  }
  return out
}

export function countFiles(dir){
  let c=0
  for(const i of fs.readdirSync(dir)){
    const p=path.join(dir,i)
    if(fs.statSync(p).isDirectory())c+=countFiles(p)
    else c++
  }
  return c
}

export function writeFile(dir,file,content){
  const p=path.join(dir,file)
  fs.ensureDirSync(path.dirname(p))
  fs.writeFileSync(p,content)
}

export function readFile(dir,file){
  return fs.readFileSync(path.join(dir,file),"utf8")
}

export function removePath(dir,file){
  fs.removeSync(path.join(dir,file))
}

export function renamePath(dir,a,b){
  fs.moveSync(path.join(dir,a),path.join(dir,b),{overwrite:true})
}