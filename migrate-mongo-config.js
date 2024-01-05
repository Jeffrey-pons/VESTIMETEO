import dotenv from 'dotenv';

dotenv.config()

const config = {
  mongodb: {
    url: process.env.MONGO_URL,
    databaseName: process.env.MONGO_DB_NAME || "VestiMeteo",
  },
  migrationsDir: "./migrations",
  changelogCollectionName: "clothingAdvice",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

export default config 
