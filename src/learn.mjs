import chalk from "chalk"
import prompts from "prompts"

export async function step(msg){
  console.log(chalk.yellow(msg))
  await prompts({type:"confirm",name:"v",message:"Continue"})
}

export function explain(cmd){
  console.log(chalk.gray("Run:"),cmd)
}