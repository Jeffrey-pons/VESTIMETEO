import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
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
UserSchema.methods.addFavoriteCity = async function (cities) {
    cities.forEach((city) => {
        if (!this.favoritesCity.includes(city)) {
            this.favoritesCity.push(city);
        }
    });
    await this.save();
};
const User = mongoose.model("User", UserSchema);
export default User;
