import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  property: [{ type: mongoose.Schema.Types.ObjectId, ref: "pDB" }],
  favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "pDB" }],
});
const uDB = model("uDB", userSchema);
export default uDB;
