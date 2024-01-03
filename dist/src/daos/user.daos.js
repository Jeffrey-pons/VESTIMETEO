import User from "../models/user.model.js";
const register = async (name, lastname, email, password) => {
    let error = null;
    let user = null;
    try {
        user = await User.create({ name, lastname, email, password });
    }
    catch (err) {
        error = `Can not create user: ${err.message}`;
    }
    return { error, user };
};
const findByEmail = async (email) => {
    let user = null;
    let error = null;
    try {
        user = await User.findOne({ email });
        if (!user)
            throw new Error(`User ${email} not found`);
    }
    catch (e) {
        console.error(e.message);
        error = e.message;
    }
    return { error, user };
};
const findByToken = async (token) => {
    let user = null;
    let error = null;
    try {
        user = await User.findOne({ resetPasswordToken: token });
        if (!user)
            throw new Error(`User ${token} not found`);
    }
    catch (e) {
        console.error(e.message);
        error = e.message;
    }
    return { error, user };
};
export const userDaos = {
    register,
    findByEmail,
    findByToken,
};
