"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
const appError_1 = __importDefault(require("../utils/appError"));
const protectedNotes = async (req, res, next) => {
    try {
        const note = await db_1.db.note.update({
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
            return next(new appError_1.default("You dont have access to this note.", 401));
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Auth failed" });
    }
};
exports.default = protectedNotes;
