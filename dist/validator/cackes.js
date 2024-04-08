"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialCacke = void 0;
const zod_1 = __importDefault(require("zod"));
const cacke = zod_1.default.object({
    id: zod_1.default.string(),
    cacke: zod_1.default.string(),
    ingredients: zod_1.default.array(zod_1.default.string()),
    size: zod_1.default.string(),
});
const validatePartialCacke = (obj) => cacke.partial().safeParse(obj);
exports.validatePartialCacke = validatePartialCacke;
