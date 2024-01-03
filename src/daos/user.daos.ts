import User from "../models/user.model.js";

interface RegisterResult {
  error: string | null;
  user: any | null;
}

interface FindByEmailResult {
  error: string | null;
  user: any | null;
}

interface FindByTokenResult {
  error: string | null;
  user: any | null;
}

const register = async (name: string, lastname: string, email: string, password: string): Promise<RegisterResult> => {
  let error: string | null = null;
  let user: any | null = null;
  try {
    user = await User.create({ name, lastname, email, password });
  } catch (err: any) {
    error = `Can not create user: ${err.message}`;
  }

  return { error, user };
};

const findByEmail = async (email: string): Promise<FindByEmailResult> => {
  let user: any | null = null;
  let error: string | null = null;
  try {
    user = await User.findOne({ email });
    if (!user) throw new Error(`User ${email} not found`);
  } catch (e: any) {
    console.error(e.message);
    error = e.message;
  }

  return { error, user };
};

const findByToken = async (token: string): Promise<FindByTokenResult> => {
  let user: any | null = null;
  let error: string | null = null;
  try {
    user = await User.findOne({ resetPasswordToken: token });
    if (!user) throw new Error(`User ${token} not found`);
  } catch (e: any) {
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
