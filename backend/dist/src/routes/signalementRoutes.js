"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { signalementController } from "../controllers/signalementController";
const userController_1 = require("../controllers/userController");
const signalementController_1 = require("../controllers/signalementController");
const router = express_1.default.Router();
router.get("/users", userController_1.UserController.getUsers);
router.get("/signalements", signalementController_1.SignalementController.getSignalement);
router.post("/signalements", signalementController_1.SignalementController.createSignalement);
exports.default = router;
