const querystring = require('querystring');  

/**
 * url 截取字符串，获取params
 * @param {*} str 需要截取的字符串
 */
export function sqlitString(str){
    if(str.indexOf('?') < 0){
        return '';
    }
    return querystring.parse(str.substring(str.indexOf('?')+1));
};

/**
 * 手机号码
 * 参数
 * size：手机号码（必填）
 * 返回对象
 * tip:提示文字
 * status: true or false 
 * 例：phone('13456434564')
 */

export function phone(size) {
    let rule = /^1[3456789]\d{9}$/;
    let res = {
        status:true,
        tip:'输入正确'
    }
    if(size == ''){
        res.status = false;
        res.tip = '手机号码不能为空！'
        return res;
    }
    if(size.length < 11){
        res.status = false;
        res.tip = '手机号码格式错误！'
        return res;
    }
    if(!rule.test(size)){
        res.status = false;
        res.tip = '手机号码格式错误！'
        return res;
    }
    return res;
}
/**
 * 数字长度
 * 参数
 * size：验证的值（必填）
 * tip：提示的文字（必填）
 * min 默认最短6，（选填）
 * max默认30（选填）
 * 返回对象
 * tip:提示文字
 * status: true or false
 * 例：VauleLength('123456','验证码)
 */
export function VauleLength(size,tip,min=6,max=30) {
    let res = {
        status:true,
        tip:'输入正确'
    }
    if(size == ''){
        res.status = false;
        res.tip = tip;
        return res;
    }
    if(size.length < min || size.length > max){
        res.status = false;
        res.tip = tip
        return res;
    }
    return res;
}

/**
 * 密码规则
 * 参数
 * size：密码（必填）
 * 返回对象
 * tip:提示文字
 * status: true or false
 * vaildPassword('Aa123456')
 */

export function vaildPassword(size) {
    let rule = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,20}/;
    let res = {
        status:true,
        tip:'输入正确'
    }
    if(size == ''){
        res.status = false;
        res.tip = '密码不能为空！'
        return res;
    }
    if(!rule.test(size)){
        res.status = false;
        res.tip = '密码必须至少8个字符，而且同时包含大小写字母和数字!'
        return res;
    }
    return res;
}