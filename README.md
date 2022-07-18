## Services are done and integrated with frontend

- Frontend PR - https://github.com/vishalviswanathan/epam_shop-react-redux-cloudfront/pull/2
- Frontend url - https://d3e54r96b1lphj.cloudfront.net

## ProductService

- getProductsList api: done
- getProductsById api: done
- swagger url - http://vishal-my-shop.com.s3-website.ap-south-1.amazonaws.com/

## ProductService endpoints

- method: GET - https://ywjkmsxky5.execute-api.ap-south-1.amazonaws.com/dev/products
- method: GET - https://ywjkmsxky5.execute-api.ap-south-1.amazonaws.com/dev/products/{productId}

## Additional scopes

- async/await added in lambda handler function
- es6 modules used
- esbuild is configured instead of webpack
- separate modules for getProductsList and getProductsById lambda functions
- "Product not found" message is displayed when invalid productId is passed
- swagger docs added

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
			"type": "integer"
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
    "category": {
			"description": "Category of the product",
			"type": "string",
		},
    "image": {
			"description": "The url of the product image",
			"type": "string",
		},
    "quantity": {
			"description": "Available quanities of product",
			"type": "number",
		}
	}
}
```
