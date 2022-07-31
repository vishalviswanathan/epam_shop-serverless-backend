import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { Client } from "pg";

import schema from "./schema";

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  console.log("event body request params =>", event.body);
  const { title, description, price, product_count } = event.body;

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
    await client.query("BEGIN");
    const insertProduct =
      "insert into products(title, description, price) values ($1, $2, $3) returning id;";
    const res = await client.query(insertProduct, [title, description, price]);
    const insertStock =
      "insert into stocks(product_id, product_count) values ($1, $2);";
    await client.query(insertStock, [res.rows[0].id, product_count]);
    await client.query("COMMIT");
    await client.end();
    console.log("res rows", res.rows);
    if (res.rows.length) {
      return formatJSONResponse({
        data: res.rows[0].id,
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
    console.log("error message", error.message);
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
