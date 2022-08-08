import postRepository from "@repositories/postRepository";
import { Request, Response } from "express";
import { PostSchema } from "src/DTOs/Post";

class PostController {
  async getAllPosts(req: Request, res: Response) {
   try {
    const posts = await postRepository.getAllPosts();

    if (posts instanceof Error) {
      return res.status(400).json({ message: posts.message})
    }

    return res.status(200).json(posts.rows)
   } catch (error) {
    return res.sendStatus(400);
   } 
  }

  async createPost(req: Request, res: Response) {
    const { title, description, image, text } = req.body;
    const { error } = PostSchema.validate({ title, description, image})

  }
}

export default new PostController();