## Services are done and integrated with frontend

- Frontend PR - https://github.com/vishalviswanathan/epam_shop-react-redux-cloudfront/pull/4
- Frontend url - https://d3e54r96b1lphj.cloudfront.net

## Import Service

### Import Service Endpoints
- importProductsFile: https://d6qi6x3r91.execute-api.ap-south-1.amazonaws.com/dev/import
- usage: https://d6qi6x3r91.execute-api.ap-south-1.amazonaws.com/dev/import?name=products
  - queryStringParameter: name

## ProductService

- integrate aws rds(used postgresql)
- createProduct api: done

### Product Service Endpoints

- method: GET - https://ywjkmsxky5.execute-api.ap-south-1.amazonaws.com/dev/products
- method: GET - https://ywjkmsxky5.execute-api.ap-south-1.amazonaws.com/dev/products/{productId}
- method: POST - https://ywjkmsxky5.execute-api.ap-south-1.amazonaws.com/dev/products

## Product Schema

```
{
	"$schema": "http://json-schema.org/draft-04/schema#",
	"title": "Product",
	"description": "A product description in the e-commerce store",
	"type": "object",
	"properties":	{
		"id": {
			"description": "Product ID to uniquely identify the product",
			"type": "uuid"
		},
		"title": {
			"description": "Title of the product",
			"type": "string",
		},
    	"description": {
			"description": "Description about the product",
			"type": "string",
		},
    	"price": {
			"description": "Price of the product",
			"type": "number",
		},
    	"product_count": {
			"description": "Available quanities of product",
			"type": "integer",
		}
	}
}
```
