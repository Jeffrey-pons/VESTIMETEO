export const userInfos = (user: any) => {
    const formatedUser = {
      id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    };
    return formatedUser;
  };
  