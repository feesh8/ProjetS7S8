"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accidentController_1 = require("../controllers/accidentController");
const router = express_1.default.Router();
router.get("/", accidentController_1.getAccidents);
router.get("/:id", accidentController_1.getAccidentById);
exports.default = router;
