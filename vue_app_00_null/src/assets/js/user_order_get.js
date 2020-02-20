import axios from "axios"
export function user_order(uid)
{
    return new Promise(
      (resolve,reject)=>{
        axios.get("user_order",{params:{uid:uid}}).then(result=>{
            resolve(result);
          })
    })
}