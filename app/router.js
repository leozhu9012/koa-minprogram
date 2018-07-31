
let router = require('koa-route');
let home = require('./controller/home');
let about = require('./controller/about');
let sign = require('./controller/sign');
let register = require('./controller/register');
let account = require('./controller/account');

let routes = new Array();
routes.push(router.get('/',home));
routes.push(router.get('/about',about));
routes.push(router.post('/sign',sign));
routes.push(router.post('/register',register));
routes.push(router.post('/account/add',account.add));
routes.push(router.get('/account/index',account.index));
routes.push(router.get('/account/delete',account.del));
routes.push(router.get('/account/getinfo',account.getInfo));
routes.push(router.get('/account/statistics',account.statistics));
routes.push(router.post('/account/update',account.updateInfo));

module.exports = routes;