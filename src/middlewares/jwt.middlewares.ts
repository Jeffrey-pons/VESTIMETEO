import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const secret: string = process.env.JWT_SECRET || "MOTDEPASSEPARDEFAUT";

const jwtOptions = {
  expiresIn: `28800000`, // 8h
};

interface DecodedToken {
  data: string;
}

const jwtVerify = (token: string): string | null => {
  try {
    if (!secret) throw new Error("Secret must be defined !");
    const decoded: DecodedToken = jwt.verify(token, secret) as DecodedToken;
    const userId: string | undefined = decoded.data;
    return userId;
  } catch (err) {
    if (err instanceof Error) {
      console.error("jwtVerify: error => ", err.message);
      return null;
    } else {
      throw err;
    }
  }
};

export const jwtSign = (data: string): string => jwt.sign({ data }, secret, jwtOptions);

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token: string | undefined = req.headers.authorization;

  if (token === undefined) {
    res.status(403).json({ message: "unauthorized" });
  } else {
    const userId: string | null = jwtVerify(token || "");

    if (!userId) {
      res.status(403).json({ message: "unauthorized" });
    } else {
      req.body = { ...req.body, userId };
      next();
    }
  }
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined = req.headers.authorization;
    console.log(req.header("Authorization"))
    if (!token) {
      res.status(403).send("Access Denied!!!!");
    }

    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimStart();
    }

    // console.log(token);
    const userId: string | null = jwtVerify(token || "");

    if (!userId) {
      res.status(403).json({ message: "unauthorized" });
    } else {
      req.body.userId = userId;
      next();
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      throw err;
    }
  }
};
