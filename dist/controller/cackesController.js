"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CackesController = void 0;
const cackesModel_1 = require("../model/cackesModel");
const node_crypto_1 = require("node:crypto");
const cackes_1 = require("../validator/cackes");
class CackesController {
    static getAllCackes = (req, res) => {
        const querys = req.query;
        const cacke = cackesModel_1.CackesModel.getAllCackes(querys);
        if (!cacke)
            return res.status(404).json({ error: "NOT_FOUND_CACKE" });
        res.json(cacke);
    };
    static createCackes = (req, res) => {
        const validate = (0, cackes_1.validatePartialCacke)(req.body);
        if (!validate.success) {
            return res.status(400).json({ error: "BAD_REQUEST" });
        }
        const { cacke, ingredients, size, } = req.body;
        const uuidCacke = (0, node_crypto_1.randomUUID)();
        const newCacke = {
            id: uuidCacke,
            cacke,
            ingredients,
            size,
        };
        const response = cackesModel_1.CackesModel.createCackes(newCacke);
        res.status(201).json(response);
    };
    static readCackeById = (req, res) => {
        const { id } = req.params;
        const user = cackesModel_1.CackesModel.readCackeById(id);
        if (!user)
            return res.status(404).json({ error: "Cacke not found" });
        res.json(user);
    };
    static updateCacke = (req, res) => {
        const { id } = req.params;
        const { cacke, ingredients, size } = req.body;
        const objUser = { id, cacke, ingredients, size };
        const validationResult = (0, cackes_1.validatePartialCacke)(objUser);
        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error });
        }
        const response = cackesModel_1.CackesModel.updateCacke(objUser);
        if (!response.message) {
            return res.status(400).json({ error: "Error to update cacke" });
        }
        return res.json(response);
    };
    static deleteCacke = (req, res) => {
        const { id } = req.params;
        const response = cackesModel_1.CackesModel.deleteCacke(id);
        if (!response.message) {
            return res.status(400).json({ error: "Error to delete cacke" });
        }
        return res.json(response);
    };
}
exports.CackesController = CackesController;
