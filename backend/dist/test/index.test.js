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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../src/index");
describe("User Endpoints", () => {
    it("GET /api/accidents should show all accidents", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).get("/api/accidents");
        expect(res.status).toEqual(200);
        // Assurez-vous que la réponse est un tableau
        expect(res.body).toBeInstanceOf(Array);
        // Vérifiez le nombre d'éléments dans le tableau
        expect(res.body.length).toEqual(965);
        // Vérifiez que tous les éléments ont les propriétés attendues
        res.body.forEach((accident) => {
            expect(accident).toHaveProperty("id");
            expect(accident).toHaveProperty("date");
            expect(accident).toHaveProperty("heure");
            expect(accident).toHaveProperty("latitude");
            expect(accident).toHaveProperty("longitude");
        });
    }));
    it("GET /api/accidents/:id should show an accident by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const accidentId = 3;
        const res = yield (0, supertest_1.default)(index_1.app).get(`/api/accidents/${accidentId}`);
        expect(res.status).toEqual(200);
        expect(res.type).toEqual("application/json");
        // Assurez-vous que la réponse a les propriétés attendues
        expect(res.body).toHaveProperty("Id", "3");
        expect(res.body).toHaveProperty("Date", "2019-07-07");
        expect(res.body).toHaveProperty("Heure", "18:20");
        expect(res.body).toHaveProperty("NbHopital", "0");
        expect(res.body).toHaveProperty("NbNonHopital", "1");
        expect(res.body).toHaveProperty("Nombre des personnes décédées", "0");
        expect(res.body).toHaveProperty("adresse", "SAINT-HELIER");
        expect(res.body).toHaveProperty("intersection", "En X");
        expect(res.body).toHaveProperty("usager1", "Conducteur");
        expect(res.body).toHaveProperty("usager2", "Conducteur");
    }));
    it("GET /api/accidents/:id should show an accident by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistingId = 966;
        const res = yield (0, supertest_1.default)(index_1.app).get(`/api/accidents/${nonExistingId}`);
        expect(res.status).toEqual(404);
        //expect(res.body).toEqual({ error: 'Invalid ID' });
    }));
});
