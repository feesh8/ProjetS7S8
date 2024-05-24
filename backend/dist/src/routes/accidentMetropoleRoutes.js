"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accidentMetropoleController_1 = require("../controllers/accidentMetropoleController");
const router = express_1.default.Router();
router.get("/accidents", accidentMetropoleController_1.AccidentMetropoleController.getAccidents);
router.get("/accidents/:id", accidentMetropoleController_1.AccidentMetropoleController.getAccidentById);
exports.default = router;
