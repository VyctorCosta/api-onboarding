"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send("No authorization header sent!");
    }
    const token = authorization.replace("Bearer", "");
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        res.locals.user = user;
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid Token!" });
    }
}
exports.validateToken = validateToken;
