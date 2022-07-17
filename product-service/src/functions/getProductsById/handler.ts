import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productsList from '@mocks/products.json';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const id: string = event.pathParameters.productId;
  const product = await Promise.resolve(productsList.find(product => product.id === parseInt(id)));
  const message: string = "Product not found";
  return formatJSONResponse({
    data: product || message,
    event,
  });
};

export const main = middyfy(getProductsById);
