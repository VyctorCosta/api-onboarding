import { UserController } from "@controllers";
import { Router } from "express";

const userRouter = Router()

userRouter.get("/", UserController.userGet);
userRouter.post("/", UserController.userPost);
userRouter.post("/login", UserController.userLogin);

export default userRouter;