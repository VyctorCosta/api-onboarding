import { Router } from "express";
import PostRouter from "./PostRoute";
import UserRouter from "./UserRoute";
import PunctuationRouter from "./PunctuationRoute";

const routes = Router();

routes.use("/user", UserRouter);
routes.use("/posts", PostRouter);
routes.use("/punctuation", PunctuationRouter);

export default routes;