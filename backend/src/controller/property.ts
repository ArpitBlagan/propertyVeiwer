import { Request, Response } from "express";
import pDB from "../schema/property";
import fs from "fs";
import { uploadFileToS3 } from "../index";

export const getProperty = async (req: Request, res: Response) => {
  try {
    const dataa = await pDB.find().sort({ createAt: -1 });
    res.status(200).json(dataa);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ff = await pDB.findByIdAndDelete(id);
    console.log(ff);
    res.status(202).json({ message: "deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong!" });
  }
};

export const addProperty = async (req: Request, res: Response) => {
  if (req.file) {
    fs.readFile(req.file.path, async (err, data) => {
      if (err) {
        throw new Error();
      } else {
        let buffer = Buffer.from(data);
        if (req.file) {
          const data = await uploadFileToS3(
            buffer,
            req.file.filename,
            req.file.path
          );
          let imageUrl = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${req.file.filename}`;
          console.log(data, imageUrl);
          fs.unlinkSync(req.file.path);
          const { type, location, price, description } = req.body;
          const owner = req.user.id;
          try {
            const info = await pDB.create({
              type,
              location,
              price,
              description,
              owner,
              image: imageUrl,
            });
            console.log(info);

            return res
              .status(202)
              .json({ message: "property added successfully!" });
          } catch (err) {
            console.log(err);

            return res.status(500).json({ message: "internal server error!" });
          }
        }
      }
    });
  } else {
    const { type, location, price, description } = req.body;
    const owner = req.user.id;
    try {
      const info = await pDB.create({
        type,
        location,
        price,
        description,
        owner,
        image: "",
      });
      console.log(info);
      res.status(202).json({ message: "property added successfully!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "internal server error!" });
    }
  }
};
export const updateProperty = async (req: Request, res: Response) => {};
