import express from "express";
import { AccidentSignalementController } from "../controllers/signalementController";
import { UserController } from "../controllers/userController";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.get(
  "/signalements/accidents",
  AccidentSignalementController.getAccidents
);

export default router;
