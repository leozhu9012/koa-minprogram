const errCode = require('../extend/errCode');

global.errCode = errCode;

//失败回掉方法封装
global.failed = function(msg){
    return {
        code: errCode.failed, 
        msg: msg,
        data: null
    }
}
//成功回掉方法封装
global.success = function(msg,data){
    return {
        code: errCode.success, 
        msg: msg,
        data: data
    }
}