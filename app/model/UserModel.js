/**
 * 用户表操作数据库方法
 */
const { query } = require('../database/async-db');

//注册
let insertData = function( value ) {
    let _sql = "insert into users(name,pass,headPortrait,sex,role,age,phone) values(?,?,?,?,?,?,?);"
    return query( _sql, [global.escape(value.name),global.escape(value.pass),global.escape(value.headPortrait),global.escape(value.sex),global.escape(value.role),global.escape(value.age),global.escape(value.phone)] )
}
//获取用户表
let getData = function (){
    let _sql = `select * from users`;
    return query( _sql )
}
// 通过名字查找用户
let findDataByName = function ( name ) {
    let _sql = "SELECT * from users where name="+global.escape(name)+""
    return query( _sql)
}
// 通过手机查找用户
let findDataByPhone = function ( phone ) {
    let _sql = "SELECT * from users where phone="+global.escape(phone)+""
    return query( _sql)
}
// 通过id查找用户
let findDataById = function ( id ) {
    let _sql = "SELECT * from users where id="+global.escape(id)+""
    return query( _sql)
}

module.exports = {
    insertData,
    findDataByName,
    findDataByPhone,
    findDataById,
    getData
}
