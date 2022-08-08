"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaUpdate = exports.UserLoginSchema = exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
});
exports.UserLoginSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.UserSchemaUpdate = joi_1.default.object({
    username: joi_1.default.string(),
    password: joi_1.default.string(),
    image: joi_1.default.string(),
});
