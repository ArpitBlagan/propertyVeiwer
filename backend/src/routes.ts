import express from "express";
import {
  signin,
  signup,
  check,
  getFav,
  removeFav,
  addfav,
} from "./controller/user";
import {
  getProperty,
  deleteProperty,
  addProperty,
} from "./controller/property";
import { authenticate } from "./middelware/authenticate";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  addContact,
  delContact,
  getIncomingContact,
  getOutgoingContact,
} from "./controller/contact";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });
const Router = express.Router();

Router.route("/signup").post(signup);
Router.route("/signin").post(signin);
Router.use(authenticate);
Router.route("/fav").get(getFav);
Router.route("/fav:propertyId").delete(removeFav);
Router.route("/fav/add").post(addfav);
Router.route("/contact").post(addContact);
Router.route("/incontact").get(getIncomingContact);
Router.route("/outcontact").get(getOutgoingContact);
Router.route("/delcontact:id").delete(delContact);
Router.route("/isloggedin").get(check);
Router.route("/property").post(upload.single("file"), addProperty);
Router.route("/property").get(getProperty);
Router.route("/property:id").delete(deleteProperty).patch();
export default Router;
