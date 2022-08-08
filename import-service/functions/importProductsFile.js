import AWS from "aws-sdk";

export const importProductsFile = async (event) => {
  const S3 = new AWS.S3({ region: "ap-south-1" });
  console.log("importProductsFile event", event);

  try {
    const filename = event.queryStringParameters.name;

    const params = {
      Bucket: "myshopuploads",
      Key: `uploaded/${filename}`,
      Expires: 60,
      ContentType: "text/csv",
    };

    const signedUrl = await S3.getSignedUrlPromise("putObject", params);
    console.log("signedUrl", signedUrl);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(signedUrl),
    };
  } catch (error) {
    const message = error.message;
    console.log("error message", error.message);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(`An error occurred: ${message}`),
    };
  }
};
