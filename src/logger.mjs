export const logger={
  lines:[],
  add(m){
    const t=new Date().toISOString()+" "+m
    this.lines.push(t)
    console.log(t)
  },
  clear(){
    this.lines=[]
  },
  dump(){
    return this.lines.slice()
  }
}