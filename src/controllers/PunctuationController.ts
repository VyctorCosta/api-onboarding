import { PunctuationRepository } from "@repositories";
import { Request, Response } from "express";

class Punctuation {
  async getAllPunctuations(req: Request, res: Response) {
    try {
      const { status, data } = await PunctuationRepository.getAllPunctuations();

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async registerPunctuation(req: Request, res: Response) {
    try {
      const { postId, punctuation } = req.body;
      const { user } = res.locals;

      const { status, data } = await PunctuationRepository.createPunctuation(
        punctuation,
        postId,
        user
      );

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new Punctuation();
