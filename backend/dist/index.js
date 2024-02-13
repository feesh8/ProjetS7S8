"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listener = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
const port = 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/api/accidents", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("http://localhost:5001/api/accidents");
        res.json(response.data);
    }
    catch (error) {
        console.error("Error fetching accident data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.get("/api/accidents/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield axios_1.default.get(`http://localhost:5001/api/accidents/${id}`);
        res.json(response.data);
    }
    catch (error) {
        console.error("Error fetching accident data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
const listener = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
exports.listener = listener;
