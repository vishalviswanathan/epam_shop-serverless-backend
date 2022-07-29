import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { Client } from "pg";

const getProductsById = async (event) => {
  const id: string = event.pathParameters.productId;
  console.log("event body path params =>", event.pathParameters);

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
        select products.id, products.title, products.description, products.price, stocks.product_count 
        from products
        inner join stocks on products.id=stocks.product_id
        where products.id=$1;`;
    const queryValue = [id];
    const res = await client.query(queryString, queryValue);
    await client.end();
    if (res.rows.length) {
      return formatJSONResponse({
        data: res.rows,
      });
    } else {
      return formatJSONResponse(
        {
          data: "Product not found",
        },
        404
      );
    }
  } catch (error) {
    await client.end();
    return formatJSONResponse(
      {
        data: "Invalid productID",
      },
      404
    );
  }
};

export const main = middyfy(getProductsById);
