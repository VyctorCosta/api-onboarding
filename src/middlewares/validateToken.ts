import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export type UserTypeJWT = {
  id: string;
  name: string;
}

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("No authorization header sent!")
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);

    res.locals.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token!" });
  }
}