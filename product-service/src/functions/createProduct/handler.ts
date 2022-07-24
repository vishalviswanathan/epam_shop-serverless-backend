import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { Client } from "pg";

import schema from "./schema";

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  console.log("event body request params =>", event, event.body);
  const {title, description, price, product_count} = event.body;

  const client = new Client({
    user: process.env.DBUSERNAME,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: parseInt(process.env.DBPORT),
  });

  client.connect((err) => {
    if (err) {
      return formatJSONResponse(
        {
          data: "Unexpected connection error occured",
        },
        500
      );
    }
  });

  try {
    const queryString = `
    with rows as (
      insert into products(title, description, price) values ($1, $2, $3) returning id
    )
    insert into stocks(product_id, product_count) 
      select id, $4
      from rows
      returning product_id;
        `;
    const queryValue = [title, description, price, product_count];
    const res = await client.query(queryString, queryValue);
    await client.end();
    if (res.rows.length) {
      return formatJSONResponse({
        data: res.rows,
      });
    } else {
      return formatJSONResponse(
        {
          data: "Failed to add product",
        },
        400
      );
    }
  } catch (error) {
    await client.end();
    return formatJSONResponse(
      {
        data: "Invalid request data",
      },
      400
    );
  }
};

export const main = middyfy(createProduct);
