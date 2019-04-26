let response = { // 主要是封装关于响应的内容
  set body(value){
    this.res.statusCode = 200; // 表明成功了
    this._body = value;
  },
  get body(){
    return this._body
  }
};




module.exports = response;