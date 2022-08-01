import csv from "csv-parser";
import AWS from "aws-sdk";

const S3 = new AWS.S3({ region: "ap-south-1" });

export const importFileParser = async (event) => {
  const record = event.Records[0];
  const key = record.s3.object.key;
  const params = {
    Bucket: "myshopuploads",
    Key: key,
  };

  const parseCSV = new Promise((resolve, reject) => {
    S3.getObject(params)
      .createReadStream()
      .pipe(csv())
      .on("data", (data) => console.log("stream data => ", data))
      .on("end", async () => {
        console.log("stream ended");
        const copyParams = {
          Bucket: "myshopuploads",
          CopySource: `myshopuploads/${record.s3.object.key}`,
          Key: record.s3.object.key.replace("uploaded", "parsed"),
        };
        await S3.copyObject(copyParams).promise();
        await S3.deleteObject({
          Bucket: "myshopuploads",
          Key: record.s3.object.key,
        }).promise();
        resolve("csv parsing completed and moved to parsed folder");
      })
      .on("error", (error) => {
        console.log("stream error =>", error);
        reject("csv parsing failed");
      });
  });

  try {
    const parseStatus = await parseCSV;
    console.log("parse success", parseStatus);
  } catch (error) {
    console.log("parse error", error);
  }
};
