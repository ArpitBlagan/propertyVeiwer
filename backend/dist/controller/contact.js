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
exports.delContact = exports.getOutgoingContact = exports.getIncomingContact = exports.addContact = void 0;
const contact_1 = __importDefault(require("../schema/contact"));
const property_1 = __importDefault(require("../schema/property"));
const addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phonenumber, message, propertyId } = req.body;
    const from = req.user.id;
    try {
        const property = yield property_1.default.findById(propertyId);
        const to = property === null || property === void 0 ? void 0 : property.owner;
        console.log(to, propertyId);
        const ress = yield contact_1.default.create({
            property: propertyId,
            from,
            to,
            phonenumber,
            email: req.user.email,
            message,
            readoff: false,
        });
        console.log(ress);
        res.status(202).json(Object.assign({}, ress));
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong!" });
    }
});
exports.addContact = addContact;
const getIncomingContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const to = req.user.id;
    try {
        const data = yield contact_1.default.find({ to }).sort({ sentAt: -1 }).populate("from");
        console.log(data);
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong!" });
    }
});
exports.getIncomingContact = getIncomingContact;
const getOutgoingContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const from = req.user.id;
    try {
        const data = yield contact_1.default.find({ from }).sort({ sendAt: -1 }).populate("to");
        console.log(data);
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong!" });
    }
});
exports.getOutgoingContact = getOutgoingContact;
const delContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const re = yield contact_1.default.findByIdAndDelete(id);
        console.log(re);
        res.status(202).json({ message: "Deleted successfully!" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong !" });
    }
});
exports.delContact = delContact;
