/**
 * 用户表操作数据库方法
 */
const { query } = require('../database/async-db');

//注册
let insertData = function( value ) {
    let _sql = "insert into admin(name,pass,role) values(?,?,?);"
    return query( _sql, value )
}

// 通过名字查找用户
let findDataByName = function ( name ) {
    let _sql = "SELECT * from users where name="+global.escape(name)+""
    return query( _sql)
}

module.exports = {
    insertData,
    findDataByName,
}
