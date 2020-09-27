// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  const {a,b} = event;
  const sum = a + b;
  return new Promise(function(resolve,reject){
    setTimeout(()=>{
      resolve(event.a+event.b)
    },3000)
  })
}