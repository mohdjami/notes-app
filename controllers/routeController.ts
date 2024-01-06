import jwt from "jsonwebtoken";
import { db } from "../lib/db";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User } from "../types/User";
import { Prisma } from "@prisma/client";
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
const createToken = async (id: string) => {
  return await jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
};
const createAndSendToken = async (
  statusCode: number,
  user: User,
  res: Response
) => {
  const token = await createToken(user.id.toString());
  res.status(statusCode).json({
    status: "success",
    user,
    token,
  });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    if (typeof data.email !== "string") {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    if (typeof data.password !== "string") {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    if (data.password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const User = await db.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    const { password, ...newUser } = User;

    createAndSendToken(201, newUser, res);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "A user with this email already exists",
        });
      }
    }
    return res.status(500).json({
      message: "Error creating user",
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const user = await db.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    const { password, ...newUser } = user;

    createAndSendToken(200, newUser, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error logging in",
    });
  }
};
