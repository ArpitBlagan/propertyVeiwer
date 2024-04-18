"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./controller/user");
const property_1 = require("./controller/property");
const authenticate_1 = require("./middelware/authenticate");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const contact_1 = require("./controller/contact");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src");
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});
const upload = (0, multer_1.default)({ storage });
const Router = express_1.default.Router();
Router.route("/signup").post(user_1.signup);
Router.route("/signin").post(user_1.signin);
Router.use(authenticate_1.authenticate);
Router.route("/fav").get(user_1.getFav);
Router.route("/fav:propertyId").delete(user_1.removeFav);
Router.route("/fav/add").post(user_1.addfav);
Router.route("/contact").post(contact_1.addContact);
Router.route("/incontact").get(contact_1.getIncomingContact);
Router.route("/outcontact").get(contact_1.getOutgoingContact);
Router.route("/delcontact:id").delete(contact_1.delContact);
Router.route("/isloggedin").get(user_1.check);
Router.route("/property").post(upload.single("file"), property_1.addProperty);
Router.route("/property").get(property_1.getProperty);
Router.route("/property:id").delete(property_1.deleteProperty).patch();
exports.default = Router;
