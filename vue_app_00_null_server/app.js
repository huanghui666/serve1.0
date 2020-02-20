// 下载第三方模块
    // express express-session mysql cors 
// 引入第三方模块
const express = require('express')
const session = require('express-session')
const mysql = require('mysql')
const cors = require('cors')
const fs =require('fs')
const multer = require("multer")
let bodyParser = require('body-parser');
// 创建数据库连接池
const pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'mt',
    port:3306,
    connectionLimit:15
});
let server = express();
//转码 避免乱码
server.use(bodyParser.urlencoded({extended:true}));
// 配置sesstion对象

server.use(session({
    secret:'128位安全字符串',  //加密条件
    resave:true,    //请求更新数据
    saveUninitialized:true   //保存初始数据
}))
// 配置跨域
server.use(cors({
    //允许程序访问列表
    origin:['http://127.0.0.1:8080','http://127.0.0.1:8080','http://127.0.0.1:8081','http://127.0.0.1:8081','http://127.0.0.1:8083','http://127.0.0.1:8083'],
    //每次请求加验证
    credentials:true
}))
// 配置sesstion
// 创建服务器对象
    //配置静态目录
    server.use(express.static('public'))
//创建文件夹
var createFolder = function(folder){
    try{
        fs.accessSync(folder); //访问folder文件夹
    }catch(e){
        fs.mkdirSync(folder);//如果不存在则创建folder文件夹
    }  
};
var uploadFolder = './upload/';
createFolder(uploadFolder);
//上传文件的重命名及存放位置
let storage = multer.diskStorage({//存储实例对象
    //目标目录
    destination:(req,file,cb)=>
    {
        cb(null,uploadFolder)//保存的文件夹
    },
    filename:(req,file,cb)=>{//保存的文件名
    //文件名
    // console.log(file.originalname)
        let idx = file.originalname.lastIndexOf(',')
        let  suff =file.originalname.substring(idx)
        cb(null, Date.now()+suff)
    }
})
// 通过 storage 选项来对 上传行为 进行定制化  创建实例 
var upload = multer({ dest: storage })
                        //上传单个文件 参数名称
server.post('/upload', upload.any(), function(req, res, next){
    let file =req.body.file
    let uid =req.body.uid
    let str =file.split('base64,')[1]//拿到图片的base64码
    var dataBuffer = new Buffer(str, 'base64'); //把base64码转成buffer对象，
    let str2 =file.split('base64,')[0];
    let x =/\/\w+/.exec(str2)
    let sss = x[0].substring(1); 
    let img = uid+'.'+sss
    fs.writeFileSync(img,dataBuffer); //存储图片
    pool.query('update user set img = ? where uid = ?',[file,uid],(err,result)=>{
        if(result.affectedRows>0)
            res.send({code:1,data:file})
        else
            res.send({code:0})
    })
});
// 为服务器对象绑定端口 
server.listen(4001)
server.get('/product',(req,res)=>{
    let {city,count,start} = req.query
    pool.query('select count(*) from product where city =?',[city],(err,result)=>
    {
        if(err) throw err
        let sum = result[0]["count(*)"]
        if(sum>start+count)
        {
            pool.query('select id,name,img,nowPrice,pastPrice,popularity from product where city = ? limit ?,?',[city,parseInt(start),parseInt(count)],(err,result2)=>
            {
                
                if(err) throw err
                if(result2.length>0)
                {
                    res.send({code:1,data:result2})
                }
                else
                {
                    res.send({code:0,data:'您所在城市再未开通'})
                }
            })
        }
        else
        {
            pool.query('select id,name,img,nowPrice,pastPrice,popularity from product where city = ? limit ?,?',[city,parseInt(start),parseInt(sum-start)],(err,result2)=>
            {
                if(err) throw err
                if(result2.length>0)
                {
                    res.send({code:2,data:result2})
                }
                else
                {
                    res.send({code:0,data:'您所在城市再未开通'})
                }
            })
        }
    })
})


server.get('/product_id',(req,res)=>{
    let {id} = req.query
    pool.query('select id,name,img,nowPrice,pastPrice,popularity from product where id = ?',[id],(err,result)=>{
        if(err) throw err
        res.send({data:result})
    })
})

server.get('/productlist',(req,res)=>{ //接口名 和前台ajax接口对应
    let {id} = req.query //拿到 前台发送来的id

    //执行sql语句 查询 productlist表中  id==前台发送来的id 的 id,title,appraise,reduction,popularity,old,start
    pool.query('select id,title,appraise,reduction,popularity,old,start from productlist where id = ?',[id],(err,result)=>{
        if(err) throw err
        if(result.length<0)//如果没有查到 就返回商家在整改
            res.send({code:0,data:'商家正在整改'})
        else//如果查询到了 就返回查询到的数据
            res.send({code:1,data:result}) 
    })
})

server.get('/productlistleft',(req,res)=>{
    let {id} = req.query
    pool.query('select name,lid from productlist_left where id = ?',[id],(err,result)=>{
        if(err) throw err
        else
        res.send({code:1,data:result}) 
    })
})

server.get('/productlistright',(req,res)=>{
    let {id} = req.query
    pool.query('select id,name,detail,price,img,lid from productlist_right where id = ?',[id],(err,result)=>{
        if(err) throw err
        else
        res.send({code:1,data:result}) 
    })
})


server.get('/user',(req,res)=>{
    let {uname} = req.query
    pool.query('select uid,uname,upwd,phone from user where uname = ?',[uname],(err,result)=>{
        if(err) throw err
        if(result.length>0)
            {
                res.send({code:1,data:result}) 
            }
            
        else
            res.send({code:0})
    })
})

server.get('/login',(req,res)=>{
    let {uname,upwd} = req.query
    pool.query('select uid,uname,upwd,phone,img from user where uname = ?',[uname],(err,result)=>{
        if(err) throw err
        if(result.length>0)
        {
            if(upwd==result[0].upwd)
            {
                req.session.uid=result[0].uid
                res.send({code:1,data:result,uid:result[0].uid}) 
            }
            else
            {
                res.send({code:-1})
            }
        }
        else
            res.send({code:0})
    })
})

server.put('/user',(req,res)=>{
    let {uname,upwd,phone,uname_old} = req.body
    uname&&pool.query('update user set uname = ? where uname = ?',[uname,uname_old],(err,result)=>{if(err)throw err;
        if(result.affectedRows>0)
        {
            res .send({code:1})
        }
    })
    upwd&&pool.query('update user set upwd = ? where uname = ?',[upwd,uname_old],(err,result)=>{if(err)throw err;
        if(result.affectedRows>0)
        {
            res .send({code:1})
        }
    })
    phone&&pool.query('update user set phone = ? where uname = ?',[phone,uname_old],(err,result)=>{if(err)throw err;
        if(result.affectedRows>0)
        {
            res .send({code:1})
        }
    })

})

server.post('/user',(req,res)=>{
    let {uname,upwd,phone} = req.body
    pool.query('insert into user(uname,upwd,phone) values (?,?,?)',[uname,upwd,phone],(err,result)=>{
        if(err)
            throw err
        if(result.affectedRows>0)
        {
            res.send({code:1,data:result})
        }
        else
        {
            res.send({code:0})
        }
    })
})

server.post('/user_detail',(req,res)=>{
    if(!req.session.uid)
        res.send({code:-6})
    else
    {
        let {name,tel,province,city,county,addressDetail,areaCode,isDefault} = req.body
        let uid = parseInt(req.session.uid)
        let  a =function(){
            return new Promise((resolve,reject)=>
            {
                pool.query('insert into user_detail(name,tel,province,city,county,addressDetail,areaCode,isDefault,uid) values (?,?,?,?,?,?,?,?,?)',[name,tel,province,city,county,addressDetail,areaCode,isDefault,uid],(err,result)=>{
                    if(err)
                        throw err
                    if(result.affectedRows<1)
                        res.send({code:0})
                    resolve()
                })
            })
        }
        let  b =function(item){
            return new Promise((resolve,reject)=>
            {
                pool.query('SELECT LAST_INSERT_ID()',(err,ress)=>{
                    if(err)
                        throw err
                    res.send({code:1,data:ress})
                })
            })
        }
        a().then(b)
    }
})

server.get('/user_detail',(req,res)=>{
    let {uid} = req.query
    pool.query('select id,name,tel,province,city,county,addressDetail,areaCode,isDefault from user_detail where uid = ?',[uid],(err,result)=>{
        if(err)
            throw err
        if(result.length>0)
        {
            res.send({code:1,data:result})
        }
        else
        {
            res.send({code:0})
        }
    })
})

server.put('/user_detail',(req,res)=>{
        let {name,tel,province,city,county,addressDetail,areaCode,isDefault,id} = req.body
        if(Boolean(isDefault)==1)
        {
            pool.query('update  user_detail set isDefault=false where id!=?',[id])
        }
        pool.query('update  user_detail set name=?,tel=?,province=?,city=?,county=?,addressDetail=?,areaCode=?,isDefault=? where id=?',[name,tel,province,city,county,addressDetail,areaCode,isDefault,id],(err,result)=>{
            if(err)
                throw err
            if(result.affectedRows<1)
                res.send({code:0})
            else
                res.send({code:1})
        })
            
})

server.get('/update_isDefault',(req,res)=>{
    let {id} = req.query
    pool.query('update user_detail set isDefault=1 where id = ?',[id])
    pool.query('update user_detail set isDefault=false where id != ?',[id])
})

server.post('/user_order',(req,res)=>{
    let {title,order,uid,sum} = req.body
    let time = new Date().toLocaleString()
    pool.query('insert into user_order (uid,title,order_,sum,time) values (?,?,?,?,?)',[parseInt(uid),title,order,sum,time],(err,result)=>{
        if(err)
            throw err
    })
})

server.get('/user_order',(req,res)=>{
    let {uid} = req.query
    pool.query('select title,order_,sum,time from user_order where uid = ?',[parseInt(uid)],(err,result)=>{
        if(err)
            throw err
        if(result.length>0)
            res.send({code:1,data:result})
        else
            res.send({code:0})
    })
})

server.get('/preciseSearch',(req,res)=>{
    let {value,city} = req.query
    pool.query(`select id,name,img,nowPrice,pastPrice,popularity from product where city=? and  name like '%${value}%'`,[city],(err,result)=>{
        if(err)
            throw err
        if(result.length>0)
            res.send({code:1,data:result})
        else
            res.send({code:0})
    })
})

server.get('/typeSearch',(req,res)=>{
    let {value,city} = req.query
    pool.query(`select id,name,img,nowPrice,pastPrice,popularity,haspage from product where city=? and  type=?`,[city,value],(err,result)=>{
        if(err)
            throw err
        if(result.length>0)
            res.send({code:1,data:result})
        else
            res.send({code:0})
    })
})

server.get('/page',(req,res)=>{
    let {list} = req.query
    let str = list.join(',')
    pool.query(`select id,image,title,page,author,about,se_title,author_img,se_title2,title2 from page where id in (?)`,[str],(err,result)=>{
        if(err)
            throw err
        res.send({code:1,data:result})
    })

})
