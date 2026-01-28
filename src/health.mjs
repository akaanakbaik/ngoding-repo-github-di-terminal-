import { diagnose } from "./diagnose.mjs"

export async function health(){
  const d=await diagnose()
  Object.entries(d).forEach(([k,v])=>{
    console.log(k,":",v)
  })
}