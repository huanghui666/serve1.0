import axios from "axios"

export function user_login(uname,upwd){
  return new Promise(
    (resolve,reject)=>{
      axios.get("login",{params:{uname:uname,upwd:upwd}}).then(result=>{
        resolve(result);
      })
    }
  )
}