import dotenv from 'dotenv';

dotenv.config()

const config = {
  mongodb: {
    url: process.env.MONGO_URL,
    databaseName: process.env.MONGO_DB_NAME || "VestiMeteo",
  },
  migrationsDir: "./migrations",
  changelogCollectionName: "users",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
  useNewUrlParser: true,
  useUnifiedTopology: true, 
};

export default config 

// Script pour modifier les valeurs des migrations : 
// update-script.js


// import dotenv from 'dotenv';
// import { MongoClient } from 'mongodb';

// dotenv.config()

// const uri = process.env.MONGO_URL;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



// async function updateDocuments() {
//   try {
//     await client.connect();

//     const database = client.db("VestiMeteo"); 
//     const collection = database.collection("users");

//     const result = await collection.updateMany({}, { $unset: { isActive: ""} });

//     console.log(`${result.modifiedCount} documents mis à jour.`);
//   } finally {
//     await client.close();
//   }
// }

// updateDocuments();

