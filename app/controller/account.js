const AccountModel = require('../model/AccountModel');
const tools = require('../extend/tools');
//获取列表
const index = async (cxt) => {
    let query = cxt.request.query;
    if(query.page == ''){
        query.page = 0;
    }
    if(query.pagenum == ''){
        query.pagenum = 10;
    }
    // ASC 或 DESC 关键字来设置查询结果是按升序或降序 // 0降序，1，升序
    if(query.sort == '' || query.sort == '0'){
        query.sort = 'DESC';
    }else{
        query.sort = 'ASC';
    }
    if(!query.startTime){
        query.startTime = '2000-01-01';
    }
    if(!query.endTime){
        query.endTime = tools.getNowFormatDate();
    }
    let res = '';
    // 获取数据
    await AccountModel.getData(query).then((r) => {
        res = r;
        if(!res){
            cxt.response.body = global.failed('获取数据失败！');
            return false;
        }
    }).catch((e) => {
        cxt.response.body = global.failed('获取数据失败！');
        return false;
    });
    for(let i=0;i<res.data.length;i++){
        res.data[i].time = tools.format(res.data[i].time);
    }
    cxt.response.body = global.success('获取数据成功！',res.data);
}
// 添加数据
const add = async (cxt) => {
    // time,discription,price,remarks
    let body = cxt.request.body;
    if(!body.discription || !body.price){
        cxt.response.body = global.failed('参数错误！');
        return false;
    }
    body.time = tools.getNowFormatDate();
    // body.time = new Date("2017-06-04");
    body.price = parseFloat(body.price).toFixed(2);
    let res = '';
    //添加记录
    await AccountModel.insertData(body).then((r) => {
        res = r;
        if(!res){
            cxt.response.body = global.failed('添加失败！');
            return false;
        }
    }).catch((e) => {
        cxt.response.body = global.failed('添加失败！');
        return false;
    });
    cxt.response.body = global.success('添加成功！','');
}
// 删除数据
const del = async (cxt) => {
    let query = cxt.request.query;
    if(!query.id){
        cxt.response.body = global.failed('请填写有效的id！');
        return false;
    }
    let res = '';
    // 删除数据
    await AccountModel.deleteData(query.id).then((r) => {
        res = r;
        if(!res){
            cxt.response.body = global.failed('删除失败！');
            return false;
        }
    }).catch((e) => {
        cxt.response.body = global.failed('删除失败！');
        return false;
    });
    cxt.response.body = global.success('删除成功！','');
    return;
}
//获取某个ID的数据
const getInfo = async(cxt) => {
    let query = cxt.request.query;
    if(!query.id){
        cxt.response.body = global.failed('请填写有效的id！');
        return false;
    }
    // 获取数据
    await AccountModel.findDataById(query.id).then((r) => {
        res = r;
        if(!res){
            cxt.response.body = global.failed('获取失败！');
            return false;
        }
    }).catch((e) => {
        cxt.response.body = global.failed('获取失败！');
        return false;
    });
    for(let i=0;i<res.data.length;i++){
        res.data[i].time = tools.format(res.data[i].time);
    }
    cxt.response.body = global.success('获取成功！',res.data);
    return;
}
//更新数据
const updateInfo = async(cxt) => {
    let body = cxt.request.body;
    if(!body.discription || !body.price || !body.id){
        cxt.response.body = global.failed('参数错误！');
        return false;
    }
    let res = '';
    body.price = parseFloat(body.price).toFixed(2);
    // 验证改id是否有数据
    await AccountModel.findDataById(body.id).then((r) => {
        res = r;
    }).catch((e) => {
        cxt.response.body = global.failed('更新失败！');
        return false;
    });
    if(!res){
        cxt.response.body = global.failed('数据库错误！');
        return false;
    }
    if(res.data.length < 1){
        cxt.response.body = global.failed('没有找到该条记录！');
        return false;
    }
    //添加记录
    await AccountModel.editData(body).then((r) => {
        res = r;
        if(!res){
            cxt.response.body = global.failed('更新失败！');
            return false;
        }
    }).catch((e) => {
        cxt.response.body = global.failed('更新失败！');
        return false;
    });
    cxt.response.body = global.success('更新成功！','');
}
const statistics = async (cxt) => {
    let query = cxt.request.query;
    query.pagenum = 100000;
    query.sort = 'DESC';
    query.page = 0;
    if(!query.startTime){
        query.startTime = tools.getCurrentMonthFirst();
    }
    if(!query.endTime){
        query.endTime = tools.getNowFormatDate();
    }
    let res = '';
    // 获取数据
    await AccountModel.getData(query).then((r) => {
        res = r;
        if(!res){
            cxt.response.body = global.failed('获取数据失败！');
            return false;
        }
    }).catch((e) => {
        cxt.response.body = global.failed('获取数据失败！');
        return false;
    });
    let total = 0;
    for(let i=0;i<res.data.length;i++){
        total += parseFloat(res.data[i].price);
    }
    cxt.response.body = global.success('获取数据成功！',{
        total: total.toFixed(2),
        num: res.data.length
    });
}
module.exports = {
    add,
    del,
    getInfo,
    updateInfo,
    index,
    statistics
};