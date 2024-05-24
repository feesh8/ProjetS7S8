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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const accidentMetropoleRoutes_1 = __importDefault(require("./routes/accidentMetropoleRoutes"));
const data_source_1 = require("./data-source");
const signalementRoutes_1 = __importDefault(require("./routes/signalementRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const app = (0, express_1.default)();
exports.app = app;
const port = 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", accidentMetropoleRoutes_1.default);
app.use("/", signalementRoutes_1.default);
app.use("/", loginRoutes_1.default);
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(port, () => {
        console.log("Server is running on http://localhost:" + port);
    });
    console.log("Data Source has been initialized!");
}))
    .catch((error) => console.log(error));
