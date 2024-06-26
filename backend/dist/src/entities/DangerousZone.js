"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DangerousZone = void 0;
const typeorm_1 = require("typeorm");
const Utilisateur_1 = require("./Utilisateur");
require("reflect-metadata");
let DangerousZone = class DangerousZone {
};
exports.DangerousZone = DangerousZone;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DangerousZone.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Utilisateur_1.Utilisateur, (user) => user.accidents),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Utilisateur_1.Utilisateur)
], DangerousZone.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DangerousZone.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DangerousZone.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DangerousZone.prototype, "description", void 0);
exports.DangerousZone = DangerousZone = __decorate([
    (0, typeorm_1.Entity)()
], DangerousZone);
