export function listenKeys(map){
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on("data",b=>{
    const k=b.toString()
    if(map[k])map[k]()
    if(k==="\u0003")process.exit(0)
  })
}