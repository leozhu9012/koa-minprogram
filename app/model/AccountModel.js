/**
 * 用户表操作数据库方法
 */
const { query } = require('../database/async-db');


//获取数据
let getData = function ( val ){
    let num = 10;
    let _sql = "select * from account where time>="+global.escape(val.startTime)+" and time<="+global.escape(val.endTime)+" order by time "+val.sort+" limit "+val.page+","+val.pagenum+"";
    return query( _sql )
}
// 添加
let insertData = function( val ) {
    let _sql = "insert into account(time,discription,price,remarks) values(?,?,?,?);"
    return query( _sql, [val.time,val.discription,val.price,val.remarks] )
}
// 修改
let editData = function ( val ) {
    let _sql = "UPDATE account SET price="+global.escape(val.price)+",remarks="+global.escape(val.remarks)+",discription="+global.escape(val.discription)+" WHERE id="+global.escape(val.id)+"";
    return query( _sql )
}
// 删除
let deleteData = function ( id ) {
    let _sql = "DELETE FROM account WHERE id="+global.escape(id)+""
    return query( _sql )
}
// 根据ID获取
let findDataById = function ( id ) {
    let _sql = "SELECT * from account where id="+global.escape(id)+""
    return query( _sql )
}
// 根据time获取
let findDataByTime = function ( time ) {
    let _sql = "SELECT * from account where time="+global.escape(time)+""
    return query( _sql )
}

// 获取消费类型
let getType = function (){
    let _sql = "select * from consume_type";
    return query( _sql );
}

// 获取消费类型二级
let getTypeSecond = function (id){
    let _sql = "select * from consume_type_second where parentId="+id+"";
    return query( _sql );
}

module.exports = {
    insertData,
    editData,
    deleteData,
    findDataById,
    findDataByTime,
    getData,
    getType,
    getTypeSecond
}
