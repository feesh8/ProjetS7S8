import express from "express";
// import { signalementController } from "../controllers/signalementController";
import { UserController } from "../controllers/userController";
import { SignalementController } from "../controllers/signalementController";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.get("/signalements", SignalementController.getSignalement);
router.post("/signalements", SignalementController.createSignalement);

export default router;
