import {sqlitString} from '../extend/tools';


const about = (cxt,next) => {
    let query = cxt.request.query;
    console.log(query);
    let params = sqlitString(cxt.request.url);
    // console.log(`用户${params.id},${params.pwd}`)
    if(params.id == 'zhu' && params.pwd == '123456'){
        cxt.response.body = { code: global.errCode.success, massage: '登录成功！'};
        return false;
    }
    cxt.response.body = { code: global.errCode.failed, massage: '登录失败！' };
}

module.exports = about;