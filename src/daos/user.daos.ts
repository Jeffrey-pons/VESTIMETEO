import User, { IUser } from "../models/user.model.js";

interface RegisterResult {
  error: string | null;
  user: IUser | null;
}

interface FindByEmailResult {
  error: string | null;
  user: IUser | null;
}

interface FindByTokenResult {
  error: string | null;
  user: IUser | null;
}

const register = async (name: string, lastname: string, email: string, password: string): Promise<RegisterResult> => {
  const result: RegisterResult = { error: null, user: null };
  try {
    result.user = await User.create({ name, lastname, email, password });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Can not create user: ${error.message}`);
      result.error = `Can not create user: ${error.message}`;
    } 
  }
  return result;
};

const findByEmail = async (email: string): Promise<FindByEmailResult> => {
  const result: FindByEmailResult = { error: null, user: null };
  try {
    result.user = await User.findOne({ email });
    if (!result.user) throw new Error(`User ${email} not found`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Can not find user by email: ${error.message}`);
      result.error = `Can not find user by email: ${error.message}`;
    } else {
      console.error(`Can not find user by email: ${error}`);
      result.error = `Can not find user by email: ${error}`;
    }
  }

  return result;
};

const findByToken = async (token: string): Promise<FindByTokenResult> => {
  const result: FindByTokenResult = { error: null, user: null };
  try {
    result.user = await User.findOne({ resetPasswordToken: token });
    if (!result.user) throw new Error(`User ${token} not found`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Can not find token: ${error.message}`);
      result.error = `Can not find token: ${error.message}`;
    } else {
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
