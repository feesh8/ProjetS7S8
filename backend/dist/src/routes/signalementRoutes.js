"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accidentSignalementController_1 = require("../controllers/accidentSignalementController");
const userController_1 = require("../controllers/userController");
const zonesDangereusesController_1 = require("../controllers/zonesDangereusesController");
const router = express_1.default.Router();
router.get("/users", userController_1.UserController.getUsers);
router.get("/signalements/accidents", accidentSignalementController_1.AccidentSignalementController.getAccidents);
router.get("/signalements/zones-dangereuses", zonesDangereusesController_1.ZonesDangereusesController.getDanger);
exports.default = router;
