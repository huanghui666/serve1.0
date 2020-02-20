import axios from "axios"
import querystring from 'querystring'
export function user_detail_post(obj)
{
    return new Promise(
      (resolve,reject)=>{
        axios.post("user_detail",querystring.stringify(obj)).then(result=>{
            resolve(result);
          })
    })
}