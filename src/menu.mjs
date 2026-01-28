import prompts from "prompts"

export async function rootMenu(){
  const r=await prompts({
    type:"select",
    name:"m",
    message:"RepoControl",
    choices:[
      {title:"Repo Controller",value:"controller"},
      {title:"Search Text",value:"search"},
      {title:"Replace Text",value:"replace"},
      {title:"Branch Manager",value:"branch"},
      {title:"Config",value:"config"},
      {title:"Export Log",value:"export"},
      {title:"Reload Plugins",value:"plugins"},
      {title:"Exit",value:"exit"}
    ]
  })
  return r.m
}