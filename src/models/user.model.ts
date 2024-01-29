import mongoose, { Schema, Document } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's first name.
 *           minLength: 2
 *           maxLength: 50
 *         lastname:
 *           type: string
 *           description: The user's last name.
 *           minLength: 2
 *           maxLength: 50
 *         email:
 *           type: string
 *           description: The user's email address.
 *           format: email
 *           unique: true
 *         password:
 *           type: string
 *           description: The user's password.
 *           minLength: 8
 *         lastLoginDate:
 *           type: string
 *           format: date-time
 *           description: The date of the user's last login.
 *         favoritesCity:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of the user's favorite cities.
 *         weatherHistory:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date of the weather record.
 *               city:
 *                 type: string
 *                 description: The city for which the weather record is saved.
 *               temperature:
 *                 type: number
 *                 description: The temperature recorded for the city.
 *               weatherCondition:
 *                 type: string
 *                 description: The weather condition recorded for the city.
 *               temperatureAdvice:
 *                 type: string
 *                 description: Advice related to the recorded temperature.
 *               weatherConditionAdvice:
 *                 type: string
 *                 description: Advice related to the recorded weather condition.
 *           description: The user's weather history.
 */

export interface IUser extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  lastLoginDate?: Date;
  favoritesCity: string[];
  weatherHistory: {
    date: Date;
    city: string;
    temperature?: number;
    weatherCondition?: string;
    temperatureAdvice?: string;
    weatherConditionAdvice?: string;
  }[];
  addFavoriteCity: (city: string) => Promise<void>;
}


const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, min: 2, max: 50 },
  lastname: { type: String, required: true, min: 2, max: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 8 },
  lastLoginDate: { type: Date },
  favoritesCity: [{ type: String }],
  weatherHistory: [
    {
      date: { type: Date, default: Date.now },
      city: { type: String, required: true },
      temperature: { type: Number },
      weatherCondition: { type: String },
      temperatureAdvice: { type: String },
      weatherConditionAdvice: { type: String },
    },
  ],
});

UserSchema.methods.addFavoriteCity = async function (cities: string[]) {
  cities.forEach((city) => {
    if (!this.favoritesCity.includes(city)) {
      this.favoritesCity.push(city);
    }
  });

  await this.save();
};
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
