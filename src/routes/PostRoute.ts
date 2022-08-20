import { Router } from "express";
import { PostController } from "@controllers";
import { validateToken } from "@middlewares/validateToken";

const PostRouter = Router();

PostRouter.get("/:postId?", PostController.getOnePost, PostController.getAllPosts);
PostRouter.post("/", validateToken, PostController.createPost);
PostRouter.delete("/:postId?", validateToken, PostController.deletePost);

export default PostRouter;