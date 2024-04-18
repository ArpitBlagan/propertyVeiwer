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
exports.uploadFileToS3 = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.DATABASE_URL)
    .then(() => {
    console.log("connected to DB");
})
    .catch((err) => {
    console.log(err);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "*",
        "http://localhost:5173",
        "https://property-veiwer.vercel.app",
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
const client_s3_1 = require("@aws-sdk/client-s3");
const s3Client = new client_s3_1.S3Client({
    region: process.env.NEXT_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_AWs_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_KEY,
    },
});
function uploadFileToS3(file, fileName, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileBuffer = yield (0, sharp_1.default)(file)
            .jpeg({ quality: 50 })
            .resize(800, 400)
            .toBuffer();
        const params = {
            Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
            Key: `${fileName}`,
            Body: fileBuffer,
            ContentType: ["image/jpg", "image/png", "image/svg"],
        };
        const command = new client_s3_1.PutObjectCommand(params);
        try {
            const response = yield s3Client.send(command);
            console.log("File uploaded successfully:", response);
            return response;
        }
        catch (error) {
            fs_1.default.unlinkSync(path);
            throw error;
        }
    });
}
exports.uploadFileToS3 = uploadFileToS3;
app.use(routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});
