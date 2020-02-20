import axios from "axios"

export function user_get(uname){
  return new Promise(
    (resolve,reject)=>{
      axios.get("user",{params:{uname:uname}}).then(result=>{
        resolve(result);
      })
    }
  )
}