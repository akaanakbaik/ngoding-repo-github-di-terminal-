export const presets={
  quick:{
    steps:["loadZip","extract","gitInit","commit","forcePush"]
  },
  safe:{
    steps:["loadZip","extract","gitInit","commit","push"]
  },
  inspect:{
    steps:["loadZip","extract"]
  }
}