import User from "../models/user.model.js";
const register = async (name, lastname, email, password) => {
    const result = { error: null, user: null };
    try {
        result.user = await User.create({ name, lastname, email, password });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Can not create user: ${error.message}`);
            result.error = `Can not create user: ${error.message}`;
        }
    }
    return result;
};
const findByEmail = async (email) => {
    const result = { error: null, user: null };
    try {
        result.user = await User.findOne({ email });
        if (!result.user)
            throw new Error(`User ${email} not found`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Can not find user by email: ${error.message}`);
            result.error = `Can not find user by email: ${error.message}`;
        }
        else {
            console.error(`Can not find user by email: ${error}`);
            result.error = `Can not find user by email: ${error}`;
        }
    }
    return result;
};
const findByToken = async (token) => {
    const result = { error: null, user: null };
    try {
        result.user = await User.findOne({ resetPasswordToken: token });
        if (!result.user)
            throw new Error(`User ${token} not found`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Can not find token: ${error.message}`);
            result.error = `Can not find token: ${error.message}`;
        }
        else {
            console.error(`Can not find token: ${error}`);
            result.error = `Can not find token: ${error}`;
        }
    }
    return result;
};
export const userDaos = {
    register,
    findByEmail,
    findByToken,
};
