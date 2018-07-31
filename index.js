require('babel-register');
const Koa = require('koa');
const app = new Koa();
const cors = require('./app/middleware/cors');//头部设置
const routes = require('./app/router');//路由
const bodyParser = require('koa-bodyparser')//解析post数据
require('./app/config/global');
global.rootUrl = __dirname;//获取项目根目录
require('./app/extend/log4Config');
// require('./app/extend/dateformat');
const tools = require('./app/extend/tools');
// 设置请求头部
app.use(cors());
// 进行requestbody解析
app.use(bodyParser());
//中间件记录请求信息
app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    let ms;
    try {
      //开始进入到下一个中间件
      // 防sql 注入正则
      if(ctx.request.method == 'GET'){
        let params = tools.sqlitString(ctx.request.url);
        if(!tools.antiSqlValid(params)){
          global.logger.info(ctx.request.header.host+ctx.request.url, "sql 敏感关键字");
          return false;
        }
      }else if(ctx.request.method == 'POST'){
        let body = ctx.request.body;
        for(var name in body){       
          if(!tools.antiSqlValid(body[name])){
            global.logger.info(ctx.request.header.host+' '+body[name], "sql 敏感关键字");
            return false;
          }
       } 
      }
      await next();
      ms = new Date() - start;
      //记录响应日志
      global.logger.info(ctx.request.header.host+ctx.request.url, ms);
    } catch (error) {
      ms = new Date() - start;
      //记录异常日志
      global.logger.error(ctx.request.header.host+ctx.request.url, error, ms);
    }
});
for(i in routes){
    app.use(routes[i]);
};

app.listen(3001);