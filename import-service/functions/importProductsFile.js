import AWS from "aws-sdk";
const S3 = new AWS.S3({ region: "ap-south-1" });
const headers = {
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
};

export const importProductsFile = async (event) => {
  console.log('importProductsFile event', event);

  try {
    const filename = event.queryStringParameters.name;

    const params = {
      Bucket: "myshopuploads",
      Key: `uploaded/${filename}`,
      Expires: 300,
      ContentType: "text/csv",
    };

    const signedUrl = await S3.getSignedUrlPromise("putObject", params);
    console.log('signedUrl', signedUrl);

    return {
        statusCode: 200,
        headers,
        body:JSON.stringify(signedUrl)
    };
  } catch (error) {
    const message = error.message;
    console.log('error message', error.message)
    return {
        statusCode: 500,
        headers,
        body:JSON.stringify(`An error occurred: ${message}`)
    };
  }
};