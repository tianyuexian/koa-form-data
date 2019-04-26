let Koa = require('koa');

let app = new Koa();

//ctx包含了 原生的req和res 又扩展了request,response
// 进来不要调用原生req 和 res
// 洋葱模型
app.use((ctx,next)=>{
  ctx.body = {name:'zfpx'};
  console.log(1);
  next();
  console.log(2);
})
app.use((ctx, next) => {
  console.log(3);
  ctx.body = { name: 'jw'};
  console.log(4);
})

app.listen(4000);