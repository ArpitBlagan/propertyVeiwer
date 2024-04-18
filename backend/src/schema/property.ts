import mongoose, { Schema, model } from "mongoose";

const propertySchema = new Schema({
  type: String,
  location: String,
  price: Number,
  image: String,
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "uDB",
  },
  postedAt: {
    type: Date,
    default: Date.now(),
  },
});

const pDB = model("pDB", propertySchema);
export default pDB;
