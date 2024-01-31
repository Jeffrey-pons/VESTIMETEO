import bcrypt from "bcrypt";
import { ManagementError } from "./managementError.utils.js";
const SALT_ROUND = 10;
export const hash = async (password) => {
    try {
        const hashed = await bcrypt.hash(password, SALT_ROUND);
        return { hashed, err: null };
    }
    catch (error) {
        console.error("Error during hash:", error);
        throw new ManagementError(500, "Error during password hashing");
    }
};
export const compareHash = async (password, toCompare) => {
    try {
        const match = await bcrypt.compare(password, toCompare);
        return { match, err: null };
    }
    catch (error) {
        console.error("Error during hash comparison:", error);
        throw new ManagementError(500, "Error during password hash comparison");
    }
};
