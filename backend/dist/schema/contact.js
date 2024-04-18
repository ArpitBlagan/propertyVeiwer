"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
    property: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "pDB",
    },
    from: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "uDB",
    },
    to: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "uDB",
    },
    readoff: {
        tyep: Boolean,
    },
    name: String,
    phonenumber: String,
    email: String,
    message: String,
    sentAt: {
        type: Date,
        default: Date.now(),
    },
});
const cDB = mongoose_1.default.model("cDB", contactSchema);
exports.default = cDB;
