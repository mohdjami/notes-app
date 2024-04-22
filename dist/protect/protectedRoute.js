"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../lib/db");
const appError_1 = __importDefault(require("../utils/appError"));
const protectedRoute = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const decoded = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "object" && "id" in decoded) {
            const currentUser = await db_1.db.user.findUnique({
                where: {
                    id: Number(decoded.id),
                },
            });
            if (!currentUser) {
                return next(new appError_1.default("The user belonging to this token does no longer exist.", 401));
            }
            console.log(req.user);
            req.user = currentUser;
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Auth failed" });
    }
};
exports.default = protectedRoute;
