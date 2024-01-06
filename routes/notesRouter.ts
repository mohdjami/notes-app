import express, { Router } from "express";
import protectedRoute from "../protect/protectedRoute";
import * as notesController from "../controllers/notesController";
const router: Router = express.Router();

router.get("/notes", protectedRoute, notesController.getAllNotes);

router.get("/notes/:id", protectedRoute, notesController.getNoteById);

router.post("/notes", protectedRoute, notesController.createNote);

router.put("/notes/:id", protectedRoute, notesController.updateNoteById);

router.delete("/notes/:id", protectedRoute, notesController.deleteNoteById);

router.post("/notes/:id/share", protectedRoute, notesController.shareNotes);

router.get("/recievedNotes", protectedRoute, notesController.recievedNotes);
// GET /api/search?q=:query
router.get("/search", protectedRoute, notesController.search);

export default router;
