import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { Client } from "pg";

const getProductsList = async () => {
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
          data: "Unexpected error occured",
        },
        500
      );
    }
  });

  try {
    const queryString = `
        select products.id, products.title, products.description, products.price, stocks.product_count 
        from products
        inner join stocks on products.id=stocks.product_id;`;
    const res = await client.query(queryString);
    await client.end();
    return formatJSONResponse({
      data: res.rows,
    });
  } catch (error) {
    await client.end();
    return formatJSONResponse(
      {
        data: "Unexpected error occured",
      },
      500
    );
  }
};

export const main = middyfy(getProductsList);
