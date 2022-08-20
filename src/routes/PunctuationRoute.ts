import { Router } from "express";
import { PunctuationController } from "@controllers";
import { validateToken } from "@middlewares/validateToken";

const PunctuationRouter = Router();

// PunctuationRouter.get("/:punctuationId?", validateToken, PunctuationController.getAllPunctuations);
PunctuationRouter.post("/", validateToken, PunctuationController.registerPunctuation);
PunctuationRouter.delete("/:postId?", validateToken, );

export default PunctuationRouter;