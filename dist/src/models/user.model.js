import mongoose from "mongoose";
const { Schema, model } = mongoose;
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's first name
 *         lastname:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password
 *       required:
 *         - name
 *         - lastname
 *         - email
 *         - password
 */
const UserSchema = new Schema({
    name: { type: String, required: true, min: 2, max: 50 },
    lastname: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 }
});
const User = model("User", UserSchema);
export default User;
