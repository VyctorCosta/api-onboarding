import { Router } from "express";
import postRouter from "./postRoute";
import userRouter from "./userRoute";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/posts", postRouter);

export default routes;