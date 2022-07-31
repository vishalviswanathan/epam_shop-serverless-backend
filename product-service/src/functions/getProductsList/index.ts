import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true      
      },
    },
  ],
  environment: {
    DBNAME: '${self:custom.rds.dbName}',
    DBUSERNAME: '${self:custom.rds.username}',
    DBPASSWORD: '${self:custom.rds.password}',
    DBHOST: '${self:custom.rds.host}',
    DBPORT: '${self:custom.rds.port}'
  }  
};
