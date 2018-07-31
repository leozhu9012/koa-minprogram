/**
 * 数据库操作
 */
const mysql = require('mysql');
global.escape = mysql.escape;

const config = require('../config/default.js')
const database = config.database


const pool = mysql.createPool({
  host: database.HOST,
  user: database.USER,
  password: database.PASSWORD,
  database: database.DATABASE
})

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
            global.logger.error("connect error",err);
            reject({code:global.errCode.failed,data:err})
        } else {
          connection.query(sql, values, ( err, rows) => {
            if ( err ) {
            //   reject( err )
                global.logger.error("query error",err);
                reject({code:global.errCode.failed,data:err})
            } else {
            //   resolve( rows )
                resolve({code:global.errCode.success,data:rows})
            }
            connection.release()
          })
        }
      })
    })
    .catch((error) => {
        // console.log(error,'Promise error');
        global.logger.error('Promise error',error);
        // reject({code:global.errCode.failed,data:error})
    });
}

module.exports = { query }
