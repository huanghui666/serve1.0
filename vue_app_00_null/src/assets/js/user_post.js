import axios from "axios"
import querystring from 'querystring'
export function user_post(obj)
{
    return new Promise(
      (resolve,reject)=>{
        axios.post("user",querystring.stringify(obj)).then(result=>{
            resolve(result);
          })
    })
}