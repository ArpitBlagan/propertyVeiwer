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
exports.updateProperty = exports.addProperty = exports.deleteProperty = exports.getProperty = void 0;
const property_1 = __importDefault(require("../schema/property"));
const fs_1 = __importDefault(require("fs"));
const index_1 = require("../index");
const getProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataa = yield property_1.default.find().sort({ createAt: -1 });
        res.status(200).json(dataa);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getProperty = getProperty;
const deleteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ff = yield property_1.default.findByIdAndDelete(id);
        console.log(ff);
        res.status(202).json({ message: "deleted successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong!" });
    }
});
exports.deleteProperty = deleteProperty;
const addProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        fs_1.default.readFile(req.file.path, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                throw new Error();
            }
            else {
                let buffer = Buffer.from(data);
                if (req.file) {
                    const data = yield (0, index_1.uploadFileToS3)(buffer, req.file.filename, req.file.path);
                    let imageUrl = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${req.file.filename}`;
                    console.log(data, imageUrl);
                    fs_1.default.unlinkSync(req.file.path);
                    const { type, location, price, description } = req.body;
                    const owner = req.user.id;
                    try {
                        const info = yield property_1.default.create({
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
                    }
                    catch (err) {
                        console.log(err);
                        return res.status(500).json({ message: "internal server error!" });
                    }
                }
            }
        }));
    }
    else {
        const { type, location, price, description } = req.body;
        const owner = req.user.id;
        try {
            const info = yield property_1.default.create({
                type,
                location,
                price,
                description,
                owner,
                image: "",
            });
            console.log(info);
            res.status(202).json({ message: "property added successfully!" });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "internal server error!" });
        }
    }
});
exports.addProperty = addProperty;
const updateProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateProperty = updateProperty;
