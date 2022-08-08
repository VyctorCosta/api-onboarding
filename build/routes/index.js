"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postRoute_1 = __importDefault(require("./postRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const routes = (0, express_1.Router)();
routes.use("/user", userRoute_1.default);
routes.use("/posts", postRoute_1.default);
exports.default = routes;
