import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pDB",
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "uDB",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
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

const cDB = mongoose.model("cDB", contactSchema);
export default cDB;
