const querystring = require('querystring');  


/**
 * url 截取字符串，获取params
 * @param {*} str 需要截取的字符串
 */
const sqlitString = function (str){
    if(str.indexOf('?') < 0){
        return '';
    }
    return str.substring(str.indexOf('?')+1);
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

const phone = function (size) {
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
const VauleLength = function (size,tip,min=6,max=30) {
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

const vaildPassword = function (size) {
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
/**
 * 获取当前时间 2017-07-31
 */
const getNowFormatDate = function () {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
/**
 * 时间格式化 2017-01-01
 * @param {*} d 2018-07-30T16:00:00.000Z
 */
const format = function (d) {
    var date = new Date(d);
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

/**
 * 获取当前月的第一天
 */
function getCurrentMonthFirst(){
    var date=new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    var currentdate = year + seperator1 + month + seperator1 + "01";
    return currentdate;
}

//防止SQL注入
const antiSqlValid = function (oField )
{
    let re= /select|update|delete|exec|insert|drop|limit|and|where|;|%/i;
    // let re= /^\?(.*)(select |insert |delete from|count\(|drop table|update truncate |asc\(|mid\(|char\(|xp_cmdshell|exec master|net localgroup administrators|\"|:|net user|\| or )(.*)$/gi;
    if ( re.test(oField) )
    {
        return false;
    }
    return true;
}

module.exports = {
    vaildPassword,
    VauleLength,
    phone,
    sqlitString,
    getNowFormatDate,
    format,
    getCurrentMonthFirst,
    antiSqlValid
}