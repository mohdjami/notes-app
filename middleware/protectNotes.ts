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
const protectedNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const note = await db.note.update({
      where: { id: Number(req.params.id) },
      data: {
        content: req.body.content,
      },
      select: {
        id: true,
        content: true,
        userId: true,
      },
    });
    if (req.user.id !== note.userId) {
      return next(new AppError("You dont have access to this note.", 401));
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Auth failed" });
  }
};
export default protectedNotes;
