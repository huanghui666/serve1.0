
import axios from "axios"
export function product_search(value,whitch,city)
{
    return new Promise(
    (resolve,reject)=>{
        switch (whitch)
          {
            case 'preciseSearch':
                axios.get("preciseSearch",{params:{city,value}}).then(result=>{resolve(result)})
                break
            case 'typeSearch':
                axios.get("typeSearch",{params:{city,value}}).then(result=>{resolve(result)})
                break
          }
    })
}