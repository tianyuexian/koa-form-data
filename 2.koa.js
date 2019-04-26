let Koa = require('./koa/application');
let app = new Koa();
let fs = require('fs');
let path = require('path');
// next 1) 权限校验 2) 可以再上面 把统一的功能进行扩展
// next 如果不调用 就不能继续执行
// 中间件函数 都可以放async函数 （promise）
let logger = function () {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('logger')
      resolve();
    }, 1000);
  })
}
// koa中 如果写了 next 必须再next前面加一个await
app.use(async (ctx, next) => {
  //throw new Error('出错了');
  console.log(1);
  ctx.set('Content-Type','text/html;charset=utf-8')
  ctx.body = fs.createReadStream(path.join(__dirname,'index.html'));
  await next(); // 并没又等待下一个async 执行完 1)await / return
  console.log(2);
})
// middle(ctx,()=>dispatch(index+1))
app.use(async (ctx, next) => {
  console.log(3);
  await logger();
  next();
  console.log(4);
});
app.use((ctx, next) => {
  console.log(5);
  next();
  console.log(6);
});
app.on('error',function (err) {
    console.log(err);
})
app.listen(3000);

// 下次课 koa 里的中间件 (异步)

// 迭代 删除目录

// let app = {};
// app.middlewares = [];
// app.use = function (fn) {
//   this.middlewares.push(fn);
// }
// // reduce  
// app.use((next) => {
//   console.log(1);
//   next();
//   console.log(3);
// })
// app.use((next) => {
//   console.log(2)
//   next()
//   console.log(4);
// });
// app.use((next) => {
//   console.log(5)
//   next()
//   console.log(6);
// });
// function dispatch(index){
//   if (index === app.middlewares.length) return;
//   let middle = app.middlewares[index]; // 默认调用第一个
//   // 将第二个数组中的方法传入
//   middle(() => dispatch(index+1)); // ()=>{}=>next函数
// }
// dispatch(0);


// 不加promise
// 作业：reduceRight 和 reduce 来实现一下这个compose 


