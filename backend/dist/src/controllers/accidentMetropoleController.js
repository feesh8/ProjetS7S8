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
exports.AccidentMetropoleController = void 0;
const axios_1 = __importDefault(require("axios"));
class AccidentMetropoleController {
    static getAccidents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get("http://localhost:5001/api/accidents");
                res.json(response.data);
            }
            catch (error) {
                console.error("Error fetching accident data:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getAccidentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const response = yield axios_1.default.get(`http://localhost:5001/api/accidents/${id}`);
                res.json(response.data);
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error) &&
                    error.response &&
                    error.response.status === 404) {
                    res.status(404).json({ error: "Not Found" });
                }
                else {
                    console.error("Error fetching accident data:", error);
                    res.status(500).json({ error: "Internal Server Error" });
                }
            }
        });
    }
}
exports.AccidentMetropoleController = AccidentMetropoleController;
