import { Router } from "express";
import { validateToken } from "@middlewares/validateToken";
import { CommentsController } from "@controllers";

const CommentsRouter = Router();

CommentsRouter.post("/", validateToken, CommentsController.createComentary);
CommentsRouter.delete("/:commentId?", validateToken, CommentsController.deleteComentary);

export default CommentsRouter;
