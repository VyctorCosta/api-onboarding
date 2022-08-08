import { Router } from "express";
import { validateToken } from "@middlewares/validateToken";
import PostController from "@controllers/PostController";

const postRouter = Router();

postRouter.get("/", PostController.getAllPosts);
// postRouter.post("/", PostController.postPost);

export default postRouter;