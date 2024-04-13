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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdoption = exports.deleteAdoption = exports.getAdoption = exports.createAdoption = exports.getAdoptions = void 0;
// DB
const database_1 = require("../database");
function getAdoptions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield (0, database_1.connect)();
            const Adoptions = yield conn.query("SELECT * FROM adoptions");
            return res.json(Adoptions[0]);
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getAdoptions = getAdoptions;
function createAdoption(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newAdoption = req.body;
        console.log(newAdoption);
        const conn = yield (0, database_1.connect)();
        yield conn.query("INSERT INTO adoptions SET ?", [newAdoption]);
        res.json({
            message: "New Adoption Created",
        });
    });
}
exports.createAdoption = createAdoption;
function getAdoption(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.adoptionId;
        const conn = yield (0, database_1.connect)();
        const Adoptions = yield conn.query("SELECT * FROM adoptions WHERE id_adoption = ?", [id]);
        res.json(Adoptions[0]);
    });
}
exports.getAdoption = getAdoption;
function deleteAdoption(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.adoptionId;
        const conn = yield (0, database_1.connect)();
        yield conn.query("DELETE FROM adoptions WHERE id_adoption = ?", [id]);
        res.json({
            message: "Adoption deleted",
        });
    });
}
exports.deleteAdoption = deleteAdoption;
function updateAdoption(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.adoptionId;
        const updateAdoption = req.body;
        const conn = yield (0, database_1.connect)();
        yield conn.query("UPDATE adoptions set ? WHERE id_adoption = ?", [updateAdoption, id]);
        res.json({
            message: "Adoption Updated",
        });
    });
}
exports.updateAdoption = updateAdoption;
