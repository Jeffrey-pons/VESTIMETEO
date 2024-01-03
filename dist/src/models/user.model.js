import mongoose from "mongoose";
const { Schema, model } = mongoose;
const UserSchema = new Schema({
    name: { type: String, required: true, min: 2, max: 50 },
    lastname: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 }
});
const User = model("User", UserSchema);
export default User;
