"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFav = exports.addfav = exports.getFav = exports.check = exports.signin = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../schema/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, email, password } = req.body;
    const hash = yield bcryptjs_1.default.hash(password, 10);
    try {
        const data = yield user_1.default.create({
            name,
            email,
            password: hash,
        });
        console.log(data);
        res.status(202).json({ message: "user signup successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "email is not registered" });
        }
        let pass = false;
        if (user.password) {
            pass = yield bcryptjs_1.default.compare(password, user.password);
        }
        if (pass) {
            const token = jsonwebtoken_1.default.sign({
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    favourite: user.favourite,
                },
            }, process.env.KEY);
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
        }
        else {
            return res.status(401).json({ message: "invalide credentials" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" });
    }
});
exports.signin = signin;
const check = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        const user = yield user_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        console.log(user.favourite);
        return res.status(200).json({
            isloggedin: "true",
            name: req.user.name,
            email: req.user.email,
            favourite: user.favourite,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong!" });
    }
});
exports.check = check;
const getFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        const dd = yield user_1.default.findById(id).populate("favourite").select("favourite");
        console.log(dd);
        return res.status(200).json(dd);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getFav = getFav;
const addfav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId } = req.body;
    try {
        const id = req.user.id;
        console.log(propertyId);
        const ff = yield user_1.default.findByIdAndUpdate(id, {
            $push: { favourite: propertyId },
        });
        console.log(ff);
        res.status(202).json({ messsage: "added successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.addfav = addfav;
const removeFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { propertyId } = req.params;
    try {
        const id = req.user.id;
        const ff = yield user_1.default.findByIdAndUpdate(id, {
            $pull: {
                favourite: propertyId,
            },
        });
        console.log(ff);
        res.status(202).json({ message: "removed successfully!" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.removeFav = removeFav;
