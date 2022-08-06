import AWS from "aws-sdk-mock";
import { importProductsFile } from "./importProductsFile";

describe("importProductsFile", () => {
  beforeEach(async () => {
    AWS.mock("S3", "getSignedUrl", "signed url");
  });

  test("it should return signed url", async () => {
    const response = await importProductsFile({
      queryStringParameters: {
        name: "testFile",
      },
    });

    expect(response).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify("signed url"),
    });
  });

  test("it should return error response", async () => {
    const response = await importProductsFile();

    expect(response).toEqual({
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: expect.stringContaining("An error occurred"),
    });
  });
});
