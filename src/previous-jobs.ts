import {
  S3Client,
  GetObjectCommand,
  NoSuchKey,
  GetObjectCommandOutput,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { streamToString } from "./lib/stream-to-string";
import { Readable } from "node:stream";

const bucketName = process.env.DEFAULT_BUCKET_NAME;
const previousJobsKey = "previous-jobs.json";

export async function getPreviousJobs(): Promise<SpotJobSearch | undefined> {
  const s3Client = new S3Client({});

  let lastJobsResponse: GetObjectCommandOutput | undefined;

  try {
    lastJobsResponse = await s3Client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: previousJobsKey,
      })
    );
  } catch (e) {
    if (e instanceof NoSuchKey) {
      return undefined;
    } else {
      throw e;
    }
  }

  if (!(lastJobsResponse.Body instanceof Readable)) {
    throw Error("Body isn't Readable");
  }
  const lastJobsString = await streamToString(lastJobsResponse.Body);
  const lastJobs = JSON.parse(lastJobsString) as SpotJobSearch;
  return lastJobs;
}

export async function setPreviousJobs(jobs: SpotJobSearch): Promise<void> {
  const s3Client = new S3Client({});
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: previousJobsKey,
      Body: JSON.stringify(jobs, null, 2),
    })
  );
}
