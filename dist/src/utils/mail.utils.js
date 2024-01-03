const isEmailValid = (email) => {
    // Expression régulière pour vérifier le format d'une adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
export default isEmailValid;
