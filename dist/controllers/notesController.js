"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.recievedNotes = exports.shareNotes = exports.deleteNoteById = exports.updateNoteById = exports.getNoteById = exports.getAllNotes = exports.createNote = exports.handleNoteNotFoundError = void 0;
const db_1 = require("../lib/db");
const handleNoteNotFoundError = (res) => {
    return res.status(404).json({ message: "Note not found" });
};
exports.handleNoteNotFoundError = handleNoteNotFoundError;
const createNote = async (req, res, next) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({
                message: "Invalid data",
            });
        }
        const note = await db_1.db.note.create({
            data: {
                content: data.content,
                userId: req.user.id,
            },
        });
        res.status(201).json({
            message: "note created",
            data: {
                note,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error creating note",
        });
    }
};
exports.createNote = createNote;
const getAllNotes = async (req, res, next) => {
    try {
        // console.log("id", req.user);
        const notes = await db_1.db.note.findMany({
            where: { userId: req.user.id },
        });
        if (!notes) {
            (0, exports.handleNoteNotFoundError)(res);
            return;
        }
        res.status(200).json({
            message: "notes fetched",
            data: {
                notes,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error fetching notes",
        });
    }
};
exports.getAllNotes = getAllNotes;
const getNoteById = async (req, res, next) => {
    try {
        // console.log(req.user.id);
        const note = await db_1.db.note.findUnique({
            where: { id: Number(req.params.id) },
        });
        if (!note) {
            (0, exports.handleNoteNotFoundError)(res);
            return;
        }
        res.status(200).json({
            message: "note fetched",
            data: {
                note,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error fetching note",
        });
    }
};
exports.getNoteById = getNoteById;
const updateNoteById = async (req, res, next) => {
    try {
        const note = await db_1.db.note.update({
            where: { id: Number(req.params.id) },
            data: {
                content: req.body.content,
            },
        });
        if (!note) {
            (0, exports.handleNoteNotFoundError)(res);
            return;
        }
        res.status(200).json({
            message: "note updated",
            data: {
                note,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error updating note",
        });
    }
};
exports.updateNoteById = updateNoteById;
const deleteNoteById = async (req, res, next) => {
    try {
        const note = await db_1.db.note.delete({
            where: { id: Number(req.params.id) },
        });
        if (!note) {
            (0, exports.handleNoteNotFoundError)(res);
            return;
        }
        res.status(200).json({
            message: "note deleted",
            data: {
                note,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Note does not exist",
        });
    }
};
exports.deleteNoteById = deleteNoteById;
const shareNotes = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        if (!id || !email) {
            return res.status(400).json({ error: "Invalid data" });
        }
        const sharedWithUser = await db_1.db.user.findUnique({
            where: { email },
        });
        const note = await db_1.db.note.findUnique({
            where: { id: parseInt(id) },
        });
        if (!note) {
            (0, exports.handleNoteNotFoundError)(res);
            return;
        }
        await db_1.db.sharedNote.create({
            data: {
                userId: Number(sharedWithUser === null || sharedWithUser === void 0 ? void 0 : sharedWithUser.id),
                noteId: note.id,
            },
        });
        res.status(200).json({
            message: "note shared",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error sharing note",
        });
    }
};
exports.shareNotes = shareNotes;
const recievedNotes = async (req, res, next) => {
    try {
        const notes = await db_1.db.sharedNote.findMany({
            where: { userId: req.user.id },
            include: {
                note: true,
            },
        });
        res.status(200).json({
            message: "notes fetched",
            data: {
                notes,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error fetching notes",
        });
    }
};
exports.recievedNotes = recievedNotes;
const search = async (req, res, next) => {
    try {
        const q = req.query.q;
        const notes = await db_1.db.note.findMany({
            where: {
                userId: req.user.id,
                content: {
                    contains: q,
                },
            },
        });
        res.status(200).json({
            message: "notes fetched",
            data: {
                notes,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "error fetching notes",
        });
    }
};
exports.search = search;
