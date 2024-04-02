"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CackesModel = void 0;
const pasteleria_json_1 = __importDefault(require("../db/pasteleria.json"));
const jsonfile_1 = __importDefault(require("jsonfile"));
class CackesModel {
    static getAllCackes = (query) => {
        const size = query.size;
        const cacke = query.cacke;
        if (size) {
            return pasteleria_json_1.default.cackes.filter((c) => c.size.toLowerCase() === size.toLowerCase()).map((size) => ({
                cake: size.cacke,
                ingredients: size.ingredients,
                size: size.size
            }));
        }
        else if (cacke) {
            const cackeInfo = pasteleria_json_1.default.cackes.find((c) => c.cacke.toLowerCase() === cacke.toLowerCase());
            if (cackeInfo) {
                const { cacke, ingredients, size } = cackeInfo;
                return { cacke, ingredients, size };
            }
        }
        return pasteleria_json_1.default.cackes.map(cacke => ({
            cacke: cacke.cacke,
            ingredients: cacke.ingredients,
            size: cacke.size
        }));
    };
    static createCackes = (objUser) => {
        const { id, cacke, ingredients, size } = objUser;
        const cackes = pasteleria_json_1.default.cackes.find((c) => c.cacke === cacke);
        if (cackes) {
            return { error: "Existing cacke" };
        }
        const newCacke = { id, cacke, ingredients, size };
        pasteleria_json_1.default.cackes.push(newCacke);
        jsonfile_1.default.writeFileSync("./src/db/pasteleria.json", pasteleria_json_1.default);
        return { message: "Cacke created successfully" };
    };
    static readUserById = (id) => {
        const cacke = pasteleria_json_1.default.cackes.find((c) => c.id === id);
        const cackeById = pasteleria_json_1.default.cackes.map(cacke => ({
            cacke: cacke.cacke,
            ingredients: cacke.ingredients,
            size: cacke.size
        }));
        if (!cacke)
            return 404;
        return cackeById;
    };
    static updateCacke = (objUser) => {
        try {
            const { id, cacke, ingredients, size } = objUser;
            const cackes = pasteleria_json_1.default.cackes.find((c) => c.id === id);
            if (!cackes) {
                return { error: "Cackes not found" };
            }
            if (id)
                cackes.id = id;
            if (cacke)
                cackes.cacke = cacke;
            if (ingredients)
                cackes.ingredients = ingredients;
            if (size)
                cackes.size = size;
            jsonfile_1.default.writeFileSync("./src/db/pasteleria.json", pasteleria_json_1.default);
        }
        catch (error) {
            return new Error();
        }
        return { message: "Successfully modified cacke" };
    };
    static deleteCacke = (id) => {
        const cacke = pasteleria_json_1.default.cackes.find((c) => c.id === id);
        if (!cacke) {
            return { error: "cacke not found" };
        }
        const cackes = pasteleria_json_1.default.cackes.filter((c) => c.id !== id);
        pasteleria_json_1.default.cackes = cackes;
        jsonfile_1.default.writeFileSync("./src/db/pasteleria.json", pasteleria_json_1.default);
        return { message: "Successfully delete cacke" };
    };
}
exports.CackesModel = CackesModel;
