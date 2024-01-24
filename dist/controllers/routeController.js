"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../lib/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const createToken = async (id) => {
    return await jsonwebtoken_1.default.sign({
        id: id,
    }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};
const createAndSendToken = async (statusCode, user, res) => {
    const token = await createToken(user.id.toString());
    res.status(statusCode).json({
        status: "success",
        user,
        token,
    });
};
const createUser = async (req, res, next) => {
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
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(data.password, salt);
        const existingUser = await db_1.db.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }
        const User = await db_1.db.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
            },
        });
        const { password, ...newUser } = User;
        createAndSendToken(201, newUser, res);
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
exports.createUser = createUser;
const login = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await db_1.db.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            return res.status(404).json({
                message: "User does not exist",
            });
        }
        const validPassword = await bcrypt_1.default.compare(data.password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }
        const { password, ...newUser } = user;
        createAndSendToken(200, newUser, res);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error logging in",
        });
    }
};
exports.login = login;
