import { Request, Response } from "express";
import cDB from "../schema/contact";
import pDB from "../schema/property";
export const addContact = async (req: Request, res: Response) => {
  const { phonenumber, message, propertyId } = req.body;
  const from = req.user.id;
  try {
    const property = await pDB.findById(propertyId);
    const to = property?.owner;
    console.log(to, propertyId);
    const ress = await cDB.create({
      property: propertyId,
      from,
      to,
      phonenumber,
      email: req.user.email,
      message,
      readoff: false,
    });
    console.log(ress);
    res.status(202).json({ ...ress });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong!" });
  }
};
export const getIncomingContact = async (req: Request, res: Response) => {
  const to = req.user.id;
  try {
    const data = await cDB.find({ to }).sort({ sentAt: -1 }).populate("from");
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong!" });
  }
};
export const getOutgoingContact = async (req: Request, res: Response) => {
  const from = req.user.id;
  try {
    const data = await cDB.find({ from }).sort({ sendAt: -1 }).populate("to");
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong!" });
  }
};
export const delContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const re = await cDB.findByIdAndDelete(id);
    console.log(re);
    res.status(202).json({ message: "Deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong !" });
  }
};
