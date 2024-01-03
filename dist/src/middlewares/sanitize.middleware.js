const sanitize = (obj) => {
    const keys = Object.keys(obj);
    const newObj = {};
    for (let key of keys) {
        const value = obj[key];
        let newValue = value;
        newObj[key] = newValue;
    }
    return newObj;
};
export const sanitizeMiddleware = (req, res, next) => {
    req.body = sanitize(req.body);
    req.params = sanitize(req.params);
    console.log("_");
    console.log("body", req.body);
    next();
};
