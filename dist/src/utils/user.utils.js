export const userInfos = (user) => {
    const formatedUser = {
        id: user._id,
        name: user.name,
        lastName: user.lastname,
        email: user.email,
    };
    return formatedUser;
};
