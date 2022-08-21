import { Request, Response } from "express";
import { CommentsRepository } from "@repositories";

class CommentsController {
  async createComentary(req: Request, res: Response) {
    try {
      const { postId, commentary } = req.body;
      const { user } = res.locals;

      const { status, data } = await CommentsRepository.createCommentary(postId, commentary, user);

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message});
      }

      return res.status(status).json(data);
    } catch (error) {
      return res.status(400).json({ message: error.message});
    }
  }

  async deleteComentary(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const { user } = res.locals;

      const { status, data } = await CommentsRepository.deleteComments(+commentId, user);

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message});
      }

      return res.status(status).json(data);
    } catch (error) {
      return res.status(400).json({ message: error.message});
    }
  }
}

export default new CommentsController();
