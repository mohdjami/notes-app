"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectedRoute_1 = __importDefault(require("../middleware/protectedRoute"));
const protectNotes_1 = __importDefault(require("../middleware/protectNotes"));
const notesController = __importStar(require("../controllers/notesController"));
const router = express_1.default.Router();
router.get("/notes", protectedRoute_1.default, notesController.getAllNotes);
router.get("/notes/:id", protectedRoute_1.default, protectNotes_1.default, notesController.getNoteById);
router.post("/notes", protectedRoute_1.default, notesController.createNote);
router.put("/notes/:id", protectedRoute_1.default, protectNotes_1.default, notesController.updateNoteById);
router.delete("/notes/:id", protectedRoute_1.default, protectNotes_1.default, notesController.deleteNoteById);
router.post("/notes/:id/share", protectedRoute_1.default, protectNotes_1.default, notesController.shareNotes);
router.get("/recievedNotes", protectedRoute_1.default, notesController.recievedNotes);
// GET /api/search?q=:query
router.get("/search", protectedRoute_1.default, notesController.search);
exports.default = router;
