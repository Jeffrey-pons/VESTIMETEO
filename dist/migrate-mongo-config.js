import dotenv from 'dotenv';
dotenv.config();
const config = {
    mongodb: {
        url: process.env.MONGO_URL,
        databaseName: process.env.MONGO_DB_NAME || "VestiMeteo",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    migrationsDir: "migrations",
    changelogCollectionName: "changelog",
    migrationFileExtension: ".js",
    useFileHash: false,
    moduleSystem: 'commonjs',
};
export default config;
