export default {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    product_count: { type: "integer" },
  },
  required: ["title", "description", "price", "product_count"],
} as const;
