import axios from "axios"
export function user_detail_get(uid)
{
    return new Promise(
      (resolve,reject)=>{
        axios.get("user_detail",{params:{uid:uid}}).then(result=>{
            resolve(result);
          })
    })
}