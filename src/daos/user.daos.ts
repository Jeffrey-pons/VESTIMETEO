import User, { IUser } from "../models/user.model.js";
import { ManagementError } from "../utils/managementError.utils.js";

interface DaoResult {
  error: string | null;
  user: IUser | null;
}

const register = async (
  name: string,
  lastname: string,
  email: string,
  password: string
): Promise<DaoResult> => {
  const result: DaoResult = { error: null, user: null };
  try {
    result.user = await User.create({ name, lastname, email, password });
  } catch (error) {
    throw new ManagementError(500, "Erreur lors de l'inscription");
  }
  return result;
};

const findByEmail = async (email: string): Promise<DaoResult> => {
  const result: DaoResult = { error: null, user: null };
  try {
    result.user = await User.findOne({ email });
    if (!result.user) throw new Error(`User ${email} not found`);
  } catch (error) {
    result.error = `Impossible de vérifier l'email`;
  }
  return result;
};

const findByToken = async (token: string): Promise<DaoResult> => {
  const result: DaoResult = { error: null, user: null };
  try {
    result.user = await User.findOne({ resetPasswordToken: token });
    if (!result.user) throw new Error(`User ${token} not found`);
  } catch (error) {
    throw new ManagementError(500, "Impossibilité de vérifier le token");
  }
  return result;
};

export const userDaos = {
  register,
  findByEmail,
  findByToken,
};
