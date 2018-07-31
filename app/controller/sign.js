const UserModel = require('../model/UserModel');

const sign = async (cxt) => {
    // cxt.response.type = 'html';
    let phone = cxt.request.body.phone || ``
    let password = cxt.request.body.password || ``
    // console.log(`用户${phone}请求登录,密码是${password}`)
    let res = '';
    //验证手机号码
    res = phone(phone);
    if(!res.status){
        cxt.response.body = global.failed(res.tip);return false;
    }
    // 验证密码
    res = vaildPassword(password);
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
    if(res.data.length < 1){
        cxt.response.body = global.failed('该用户不存在，请先注册！');
        return false;
    }
    //验证账号密码是否匹配
    if(phone == res.data[0].phone && password == res.data[0].pass){
        cxt.response.body = global.success('登录成功！','');
        return false;
    }
    cxt.response.body = global.failed('登录失败！');
}

module.exports = sign;