import jwt from "jsonwebtoken";
export const secret = process.env.JWT_SECRET || "MOTDEPASSEPARDEFAUT";
const jwtOptions = {
    expiresIn: `28800000`, // 8h
};
const jwtVerify = (token) => {
    try {
        if (!secret)
            throw new Error("Secret must be defined !");
        const decoded = jwt.verify(token, secret);
        const userId = decoded.data;
        return userId;
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("jwtVerify: error => ", err.message);
            return null;
        }
        else {
            throw err;
        }
    }
};
export const jwtSign = (data) => jwt.sign({ data }, secret, jwtOptions);
export const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === undefined) {
        res.status(403).json({ message: "unauthorized" });
    }
    else {
        const userId = jwtVerify(token || "");
        if (!userId) {
            res.status(403).json({ message: "unauthorized" });
        }
        else {
            req.body = Object.assign(Object.assign({}, req.body), { userId });
            next();
        }
    }
};
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log(req.header("Authorization"));
        if (!token) {
            res.status(403).send("Access Denied!!!!");
        }
        if (token && token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimStart();
        }
        // console.log(token);
        const userId = jwtVerify(token || "");
        if (!userId) {
            res.status(403).json({ message: "unauthorized" });
        }
        else {
            req.body.userId = userId;
            next();
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            throw err;
        }
    }
};
