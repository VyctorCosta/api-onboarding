import { Router } from "express";
import PostRouter from "./PostRoute";
import UserRouter from "./UserRoute";
import PunctuationRouter from "./PunctuationRoute";
import CommentsRouter from "./CommentsRoute";

const routes = Router();

routes.use("/user", UserRouter);
routes.use("/posts", PostRouter);
routes.use("/punctuation", PunctuationRouter);
routes.use("/comments", CommentsRouter);

export default routes;