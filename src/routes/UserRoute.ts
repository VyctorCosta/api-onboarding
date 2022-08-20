import { UserController } from "@controllers";
import { validateToken } from "@middlewares/validateToken";
import { Router } from "express";

const UserRouter = Router()

UserRouter.get("/", UserController.userGet);
UserRouter.post("/", UserController.userPost);
UserRouter.post("/login", UserController.userLogin);
UserRouter.delete("/", validateToken,UserController.userDelete);

export default UserRouter;