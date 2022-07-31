import { handlerPath } from "@libs/handler-resolver";
import schema from "./schema";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "products",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
  environment: {
    DBNAME: "${self:custom.rds.dbName}",
    DBUSERNAME: "${self:custom.rds.username}",
    DBPASSWORD: "${self:custom.rds.password}",
    DBHOST: "${self:custom.rds.host}",
    DBPORT: "${self:custom.rds.port}",
  },
};
