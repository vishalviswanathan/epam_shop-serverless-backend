# Product Service

## ProductService endpoints

- method: GET - https://ywjkmsxky5.execute-api.ap-south-1.amazonaws.com/dev/products
- method: GET - https://ywjkmsxky5.execute-api.ap-south-1.amazonaws.com/dev/products/{productId}

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
