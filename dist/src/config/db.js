import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MongoDb = async () => {
    try {
        mongoose.set("strictQuery", false);
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined");
        }
        await mongoose.connect(process.env.MONGO_URL, { dbName: "VestiMeteo" });
        console.log("Database connected");
    }
    catch (error) {
        console.log("Not connected: ", error.message);
    }
};
export default MongoDb;
