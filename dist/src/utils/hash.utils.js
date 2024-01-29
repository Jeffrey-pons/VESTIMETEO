import bcrypt from "bcrypt";
const SALT_ROUND = 10;
export const hash = async (password) => {
    let error = null;
    let hashed = null;
    try {
        hashed = await bcrypt.hash(password, SALT_ROUND);
    }
    catch (e) {
        if (e instanceof Error) {
            error = `Error when hash: ${e.message}`;
        }
    }
    return { hashed, err: error };
};
export const compareHash = async (password, toCompare) => {
    let error = null;
    let match = false;
    try {
        match = await bcrypt.compare(password, toCompare);
    }
    catch (e) {
        if (e instanceof Error) {
            error = `Error when compare: ${e.message}`;
        }
    }
    return { match, err: error };
};
