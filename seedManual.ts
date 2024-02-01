import mongoose from 'mongoose';
import User from './src/models/user.model.js';
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  throw new Error('MONGO_URL environment variable is not defined.');
}

await mongoose.connect(mongoUrl, { dbName: "VestiMeteo" });

const users = [
  { name: 'Noa', lastname: 'Doe', email: 'noadoe@gmail.com', password: 'hashedP!!assword123' },
];

try {
  for (const user of users) {
    const newUser = new User(user);
    await newUser.save(); 
    console.log(`User ${user.name} saved to the database.`);
  }
  console.log('All users have been saved.');
} catch (error) {
  console.error('Error seeding users:', error);
} finally {
  mongoose.connection.close();
}