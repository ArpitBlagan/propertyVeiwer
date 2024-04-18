import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.KEY as string, (error: any, decoded: any) => {
    if (error) {
      return res.status(401).json({
        message: "TokenExpired",
      });
    } else {
      req.user = decoded.user;
      next();
    }
  });
};
