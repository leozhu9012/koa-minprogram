
const UserModel = require('../model/UserModel');
const tools = require('../extend/tools');
const register = async(cxt) => {
    let phone = cxt.request.body.phone || ``;
    let password = cxt.request.body.password || ``;
    // console.log(`用户${phone}请求注册,密码是${password}`);
    let res = '';
    //验证手机号码
    res = tools.phone(phone);
    if(!res.status){
        cxt.response.body = global.failed(res.tip);return false;
    }
    // 验证密码
    res = tools.vaildPassword(password);
    if(!res.status){
        cxt.response.body = global.failed(res.tip);return false;
    }
    // 验证是否注册过
    await UserModel.findDataByPhone(phone).then((r) => {
        res = r;
    }).catch((e) => {
        cxt.response.body = global.failed('注册失败！');
        return false;
    });
    if(res.code != 1){
        cxt.response.body = global.failed('数据库错误！');
        return false;
    }
    if(res.data.length > 0){
        cxt.response.body = global.failed('该用户已注册！');
        return false;
    }
    //将账号密码写入数据库
    // name,pass,headPortrait,sex,role,age,phone
    await UserModel.insertData({name:'',pass:password,headPortrait:'',sex:'0',role:0,age:0,phone:phone}).then((r) => {
        res = r;
    }).catch((e) => {
        cxt.response.body = global.failed('注册失败！');
        return false;
    });
    if(res.code != 1){
        cxt.response.body = global.failed('注册失败！');
        return false;
    }   
    cxt.response.body = global.success('注册成功！','');
    return;
}

module.exports = register;