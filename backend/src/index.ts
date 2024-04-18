import express from "express";
import Router from "./routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookie from "cookie-parser";
import sharp from "sharp";
import fs from "fs";
dotenv.config();
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(
  cors({
    origin: [
      "*",
      "http://localhost:5173",
      "https://property-veiwer.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookie());
app.use(express.json());
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_AWs_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_KEY as string,
  },
});

export async function uploadFileToS3(file: Buffer, fileName: any, path: any) {
  const fileBuffer = await sharp(file)
    .jpeg({ quality: 50 })
    .resize(800, 400)
    .toBuffer();
  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME as string,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: ["image/jpg", "image/png", "image/svg"],
  };

  const command = new PutObjectCommand(params as any);
  try {
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
    return response;
  } catch (error) {
    fs.unlinkSync(path);
    throw error;
  }
}

app.use(Router);
app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
