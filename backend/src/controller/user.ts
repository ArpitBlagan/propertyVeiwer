import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import uDB from "../schema/user";
import jwt from "jsonwebtoken";
export const signup = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const data = await uDB.create({
      name,
      email,
      password: hash,
    });
    console.log(data);
    res.status(202).json({ message: "user signup successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};
export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await uDB.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "email is not registered" });
    }
    let pass = false;
    if (user.password) {
      pass = await bcrypt.compare(password, user.password);
    }
    if (pass) {
      const token = jwt.sign(
        {
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
          },
        },
        process.env.KEY as string
      );
      //send it to user through cookies
      res.cookie("jwt", token, {
        //30 days in milisecond
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.status(201).json({
        isloggedin: "true",
        message: "successfully logedIn",
        name: user.name,
        email: user.email,
      });
    } else {
      return res.status(401).json({ message: "invalide credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};
export const check = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ isloggedin: "true", name: req.user.name, email: req.user.email });
};

export const getFav = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const dd = await uDB.findById(id).populate("favourite").select("favourite");
    console.log(dd);
    return res.status(200).json(dd);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
export const addfav = async (req: Request, res: Response) => {
  const { propertyId } = req.body;
  try {
    const id = req.user.id;
    console.log(propertyId);
    const ff = await uDB.findByIdAndUpdate(id, {
      $push: { favourite: propertyId },
    });
    console.log(ff);
    res.status(202).json({ messsage: "added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
export const removeFav = async (req: Request, res: Response) => {
  const { propertyId } = req.params;
  try {
    const id = req.user.id;
    const ff = await uDB.findByIdAndUpdate(id, {
      $pull: {
        favourite: propertyId,
      },
    });
    console.log(ff);
    res.status(202).json({ message: "removed successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
