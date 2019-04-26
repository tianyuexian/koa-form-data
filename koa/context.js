let context = {};
// 如果去context 上去值 我希望去context.request上取


// js有一个不常用的方法   Object.defineProperty变种
function defineGetter(key,property) { // 定义获取器
  context.__defineGetter__(property, function () {
    return this[key][property];
  })
}
// 给某个属性定义setter
function defineSetter(key,property) {
  context.__defineSetter__(property, function (value) {
    this[key][property] = value
  })
}
// 代理 把取属性的值 通过request来获取
defineGetter('request','path');
defineGetter('request','url');
defineGetter('request','query');
// ctx.body => ctx.response.body;
defineGetter('response','body');
// ctx.body = '100'  ctx.response.body = '100'
defineSetter('response','body');


module.exports = context