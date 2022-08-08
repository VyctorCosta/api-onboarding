"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _controllers_1 = require("@controllers");
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
userRouter.get("/", _controllers_1.UserController.userGet);
userRouter.post("/", _controllers_1.UserController.userPost);
userRouter.post("/login", _controllers_1.UserController.userLogin);
exports.default = userRouter;
