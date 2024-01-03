const isPasswordValid = (password) => {
    const errors = [];
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;
    if (!hasUpperCase) {
        errors.push("Le mot de passe doit contenir au moins une lettre majuscule.");
    }
    if (!hasLowerCase) {
        errors.push("Le mot de passe doit contenir au moins une lettre minuscule.");
    }
    if (!hasSpecialChar) {
        errors.push("Le mot de passe doit contenir au moins un caractère spécial.");
    }
    if (!isLengthValid) {
        errors.push("Le mot de passe doit contenir au moins 8 caractères.");
    }
    return { valid: hasUpperCase && hasLowerCase && hasSpecialChar && isLengthValid, errors };
};
export default isPasswordValid;
