import express, { Router } from "express";
import protectedRoute from "../middleware/protectedRoute";
import protectedNotes from "../middleware/protectNotes";

import * as notesController from "../controllers/notesController";
const router: Router = express.Router();

router.get("/notes", protectedRoute, notesController.getAllNotes);

router.get(
  "/notes/:id",
  protectedRoute,
  protectedNotes,
  notesController.getNoteById
);

router.post("/notes", protectedRoute, notesController.createNote);

router.put(
  "/notes/:id",
  protectedRoute,
  protectedNotes,
  notesController.updateNoteById
);

router.delete(
  "/notes/:id",
  protectedRoute,
  protectedNotes,
  notesController.deleteNoteById
);

router.post(
  "/notes/:id/share",
  protectedRoute,
  protectedNotes,
  notesController.shareNotes
);

router.get("/recievedNotes", protectedRoute, notesController.recievedNotes);

// GET /api/search?q=:query
router.get("/search", protectedRoute, notesController.search);

export default router;
