import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productsList from '@mocks/products.json';

const getProductsList = async () => {
  return formatJSONResponse({
    data: productsList
  });
};

export const main = middyfy(getProductsList);
