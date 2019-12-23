const log4js=require('log4js');


require('dotenv').config();

log4js.configure({
  appenders: {
    logstash: {
      type: "@log4js-node/logstash-http",
      url: process.env.ELASTIC_LOGSTASH_URL,
      application: "birthday_finder_log",
      logType: "application"
    },
    file: {
      type: 'file',
      filename: './logs/debugger.log',
      maxLogSize: 1200000,
      backups: 5
    }
    
  },
  categories: {
   
    error: {
      appenders: ['file','logstash'],
      level: 'error'
    },
    warn: {
      appenders: ['file','logstash'],
      level: 'warn'
    },
    default: {
      appenders: ['file','logstash'],
      level: 'info'
    }
  }

});



const logger=log4js.getLogger();


module.exports={logger};