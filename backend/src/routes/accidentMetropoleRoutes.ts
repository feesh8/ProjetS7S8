import express from "express";
import { AccidentMetropoleController } from "../controllers/accidentMetropoleController";

const router = express.Router();

router.get("/accidents", AccidentMetropoleController.getAccidents);
router.get("/accidents/:id", AccidentMetropoleController.getAccidentById);

export default router;
