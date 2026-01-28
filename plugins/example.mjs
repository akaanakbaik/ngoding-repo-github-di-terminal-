export async function beforeCommit(ctx){
  console.log("plugin beforeCommit",ctx.workdir)
}

export async function afterPush(ctx){
  console.log("plugin afterPush",ctx.repo)
}