import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productsList from '@mocks/products.json';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const id: string = event.pathParameters.productId;
  const product = await Promise.resolve(productsList.find(product => product.id === parseInt(id)));
  const message: string = "Product not found";
  let statusCode: number = product ? 200 : 404;
  return formatJSONResponse({
    data: product || message
  }, statusCode);
};

export const main = middyfy(getProductsById);
