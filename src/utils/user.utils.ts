import { IUser } from "../models/user.model.js";

export const userInfos = (user: IUser) => {
    const formatedUser = {
      id: user._id,
      name: user.name,
      lastName: user.lastname,
      email: user.email,
    };
    return formatedUser;
  };
  