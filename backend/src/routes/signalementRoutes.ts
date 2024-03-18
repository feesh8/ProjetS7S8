import express from "express";
import { AccidentSignalementController } from "../controllers/accidentSignalementController";
import { UserController } from "../controllers/userController";
import { ZonesDangereusesController } from "../controllers/zonesDangereusesController";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.get(
  "/signalements/accidents",
  AccidentSignalementController.getAccidents
);
router.get(
  "/signalements/zones-dangereuses",
  ZonesDangereusesController.getDanger
);

export default router;
