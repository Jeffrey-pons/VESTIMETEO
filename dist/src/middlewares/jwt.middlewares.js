import jwt from "jsonwebtoken";
import { ManagementError } from "../utils/managementError.utils.js";
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
        throw new ManagementError(500, "jwtVerify: error => ");
    }
};
export const jwtSign = (data) => jwt.sign({ data }, secret, jwtOptions);
export const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === undefined) {
        throw new ManagementError(403, "unauthorized");
    }
    else {
        const userId = jwtVerify(token || "");
        if (!userId) {
            throw new ManagementError(403, "unauthorized");
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
            throw new ManagementError(403, "Access Denied!!!!");
        }
        if (token && token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimStart();
        }
        const userId = jwtVerify(token || "");
        if (!userId) {
            throw new ManagementError(403, "unauthorized");
        }
        else {
            req.body.userId = userId;
            next();
        }
    }
    catch (err) {
        throw new ManagementError(500, "jwtVerify: error => ");
    }
};
