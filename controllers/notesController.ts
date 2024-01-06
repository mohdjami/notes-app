import jwt from "jsonwebtoken";
import { db } from "../lib/db";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/User";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const handleNoteNotFoundError = (res: Response) => {
  return res.status(404).json({ message: "Note not found" });
};

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({
        message: "Invalid data",
      });
    }
    const note = await db.note.create({
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
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "error creating note",
    });
  }
};

export const getAllNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log("id", req.user);
    const notes = await db.note.findMany({
      where: { userId: req.user.id },
    });
    if (!notes) {
      handleNoteNotFoundError(res);
      return;
    }
    res.status(200).json({
      message: "notes fetched",
      data: {
        notes,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error fetching notes",
    });
  }
};

export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.user.id);
    const note = await db.note.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!note) {
      handleNoteNotFoundError(res);
      return;
    }
    res.status(200).json({
      message: "note fetched",
      data: {
        note,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error fetching note",
    });
  }
};

export const updateNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = await db.note.update({
      where: { id: Number(req.params.id) },
      data: {
        content: req.body.content,
      },
    });
    if (!note) {
      handleNoteNotFoundError(res);
      return;
    }
    res.status(200).json({
      message: "note updated",
      data: {
        note,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error updating note",
    });
  }
};

export const deleteNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = await db.note.delete({
      where: { id: Number(req.params.id) },
    });
    if (!note) {
      handleNoteNotFoundError(res);
      return;
    }
    res.status(200).json({
      message: "note deleted",
      data: {
        note,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Note does not exist",
    });
  }
};

export const shareNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    if (!id || !email) {
      return res.status(400).json({ error: "Invalid data" });
    }
    const sharedWithUser = await db.user.findUnique({
      where: { email },
    });

    const note = await db.note.findUnique({
      where: { id: parseInt(id) },
    });
    if (!note) {
      handleNoteNotFoundError(res);
      return;
    }

    await db.sharedNote.create({
      data: {
        userId: Number(sharedWithUser?.id),
        noteId: note.id,
      },
    });
    res.status(200).json({
      message: "note shared",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error sharing note",
    });
  }
};

export const recievedNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await db.sharedNote.findMany({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error fetching notes",
    });
  }
};

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const q = req.query.q;
    const notes = await db.note.findMany({
      where: {
        userId: req.user.id,
        content: {
          contains: q as string,
        },
      },
    });
    res.status(200).json({
      message: "notes fetched",
      data: {
        notes,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error fetching notes",
    });
  }
};
