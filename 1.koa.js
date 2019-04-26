let Koa = require('./koa/application');
let app = new Koa();
// listen 监听端口的
// use 实现中间件
// reduce -> compose  len toUppercase add
// 默认不返回结果 表示文件找不到
app.use((ctx)=>{ // 请求的路径 req.url =>  pathname
  console.log(ctx.req.path); // 原生的url 
  console.log(ctx.request.req.path);
  // console.log(ctx.response.req.url);
  console.log(ctx.request.path);
  console.log(ctx.path); // ctx.request.path

  ctx.response.body = 'hello';
  console.log(ctx.body);
  // ctx = {}
  // ctx.request = {}
  // ctx.req = ctx.request.req = req;
  // ctx.res = ctx.response.res = res;
  // ctx.path 代理 ctx.request.path 属性
});
app.listen(3000);



// ctx req/res http.createServer((req,res))
  // ctx request/response 自己封装的 对象