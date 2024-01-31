import User from "../models/user.model.js";
import { ManagementError } from "../utils/managementError.utils.js";
const register = async (name, lastname, email, password) => {
    const result = { error: null, user: null };
    try {
        result.user = await User.create({ name, lastname, email, password });
    }
    catch (error) {
        throw new ManagementError(500, "Erreur lors de l'inscription");
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
        result.error = `Impossible de vérifier l'email`;
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
        throw new ManagementError(500, "Impossibilité de vérifier le token");
    }
    return result;
};
export const userDaos = {
    register,
    findByEmail,
    findByToken,
};
