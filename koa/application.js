// es6写的
let http = require('http');
let path = require('path');
let fs = require('fs');
let context = require('./context');
let request = require('./request');
let response = require('./response');
let EventEmitter = require('events');
let Stream = require('stream');
class Koa extends EventEmitter{
  constructor() {
    super();
    this.middleware; // Object.create(null); 没有原型的对象
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.middlewares = [];
  }
  // 注册中间件的方法
  use(fn) {
    this.middlewares.push(fn);
  }
  // 创建上下文
  createContext(req, res) { // 自己封装request 和response属性
    let ctx = this.context;
    ctx.request = this.request;
    ctx.req = ctx.request.req = req; // 请求相关的

    ctx.response = this.response;
    ctx.res = ctx.response.res = res; // 响应相关的
    return ctx;
  }
  // 组合方法
  compose(middles, ctx) {
    function dispatch(index) {
      // 如果没有注册中间件 需要返回一个成功的promise
      if(index === middles.length) return Promise.resolve();
      let middle = middles[index];
      // 让第一个函数执行完 如果有异步要看一看 有没有await, 必须要返回一个promise 
      return Promise.resolve(middle(ctx, () => dispatch(index + 1)));
    }
    return dispatch(0);
  }
  // 处理用户请求到来时
  handleRequest(req, res) {
    let ctx = this.createContext(req, res);
    res.statusCode = 404; //默认我就认为你返回的404没有调用ctx.body;
    let fn = this.compose(this.middlewares, ctx);
    // 把所有的函数进行组合 当组合的函数执行成功后 把最终的结果进行响应
    fn.then(()=>{
      if (!ctx.body){
        res.end('Not Found')
      } else if (ctx.body instanceof Stream){
        res.setHeader('Content-Type','text/html;charset=utf-8')
        ctx.body.pipe(res);
      }else if (typeof ctx.body ==='object'){
        res.setHeader('Content-Type','application/json;charset=utf-8');
        res.end(JSON.stringify(ctx.body));
      }else{ 
        res.end(ctx.body); // 用res.end结束
      }
    }).catch(err=>{
      this.emit('error',err);
    })
  }
  listen(...args) {
    // 启动服务
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}
module.exports = Koa;


