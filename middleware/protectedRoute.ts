import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "../lib/db";
import AppError from "../utils/appError";
import { User } from "../types/User";
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = await jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );
    if (typeof decoded === "object" && "id" in decoded) {
      const currentUser = await db.user.findUnique({
        where: {
          id: Number((decoded as JwtPayload).id),
        },
      });

      if (!currentUser) {
        return next(
          new AppError(
            "The user belonging to this token does no longer exist.",
            401
          )
        );
      }
      req.user = currentUser;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Auth failed" });
  }
};

export default protectedRoute;
