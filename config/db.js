import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MongoDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL, { dbName: "VestiMeteo" });
    console.log("Database connected");
  } catch (error) {
    console.log("Not connected : ", error.message);
  }
};

export default MongoDb;
