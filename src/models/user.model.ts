import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
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
