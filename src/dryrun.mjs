export function dry(label,fn){
  return async function(...a){
    console.log("DRY-RUN:",label)
    return {skipped:true,args:a}
  }
}

export function applyDry(run,label,fn){
  return run?dry(label,fn):fn
}