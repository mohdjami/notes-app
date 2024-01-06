import express, { Router } from "express";
import * as routeController from "../controllers/routeController";
import protectedRoute from "../protect/protectedRoute";
import * as notesController from "../controllers/notesController";
const router: Router = express.Router();

router.post("/signup", routeController.createUser);

router.post("/login", routeController.login);
export default router;
