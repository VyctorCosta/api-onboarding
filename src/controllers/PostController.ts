import { NextFunction, Request, Response } from "express";
import { PostRepository } from "@repositories";

class PostController {
  async getOnePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;

      if (postId) {
        const { status, data } = await PostRepository.getOnePost(+postId);

        if (data instanceof Error) {
          return res.status(status).json({ message: data.message });
        }

        return res.status(status).json(data);
      }

      return next();
    } catch (error) {
      return res.sendStatus(400);
    }
  }
  
  async getAllPosts(req: Request, res: Response) {
    try {
      const { status, data } = await PostRepository.getAllPosts();

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data);
    } catch (error) {
      return res.sendStatus(400);
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      const { title, description, image, text } = req.body;
      const { user } = res.locals;

      const { status, data } = await PostRepository.createPost(title, description, image, text, user);

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data)
    } catch (error) {
      return res.sendStatus(400);
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const { user } = res.locals;

      if (!postId) {
        return res.status(400).json({ message: "Missing id parameter!" });
      }

      const { status, data } = await PostRepository.deletePost(+postId, user);
      
      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data);
    } catch (error) {
      console.log(error)
      return res.sendStatus(400);
    }
  }
}

export default new PostController();
