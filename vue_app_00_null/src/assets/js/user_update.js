import axios from "axios"
import querystring from 'querystring'
export function user_update(msg,whitch,uname_old)
{
    return new Promise(
      (resolve,reject)=>{
          switch (whitch)
          {
            case 'uname':
                axios.put("user",querystring.stringify({ phone:'',upwd:'',uname:msg,uname_old:uname_old})).then(result=>{resolve(result)});
                break
            case 'upwd':
                axios.put("user",querystring.stringify({ phone:'',uname:'',upwd:msg,uname_old:uname_old})).then(result=>{resolve(result)});
                break
            case 'phone':
                axios.put("user",querystring.stringify({ upwd:'',uname:'',phone:msg,uname_old:uname_old})).then(result=>{resolve(result)});
                break
          }
        })
}