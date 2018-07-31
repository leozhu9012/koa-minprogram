/**
 * 操作日志配置
 */
const log4js = require('log4js');

log4js.configure({
    appenders: { 
        cheese: { 
            type: 'dateFile', 
            filename: global.rootUrl + '/logs/date', 
            pattern:"-yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            loggermaxLogSize: 102400,
            backups: 10, // 日志备份数量，大于该数则自动删除
            category: 'logInfo' // 记录器名  
        } 
    },
    categories: { 
        default: { 
            appenders: ['cheese'], 
            level: 'info' 
        } 
    },
    replaceConsole: true // 替换 console.log
});

const logger = log4js.getLogger('normal');
global.logger = logger;

//写入日志方法
// global.logger.trace('Entering cheese testing');
// global.logger.debug('Got cheese.');
// global.logger.info('Cheese is Gouda.');
// global.logger.warn('Cheese is quite smelly.');
// global.logger.error('Cheese is too ripe!');
// global.logger.fatal('Cheese was breeding ground for listeria.');