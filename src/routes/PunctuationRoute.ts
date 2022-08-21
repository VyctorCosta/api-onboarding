import { Router } from "express";
import { PunctuationController } from "@controllers";
import { validateToken } from "@middlewares/validateToken";

const PunctuationRouter = Router();

PunctuationRouter.post("/", validateToken, PunctuationController.registerPunctuation);

export default PunctuationRouter;