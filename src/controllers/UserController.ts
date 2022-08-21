import { Request, Response } from "express";
import { QueryResponseUser, UserRepository } from "@repositories";
import { client } from "@database";

class UserController {
  async userPost(req: Request, res: Response) {
    try {
      const { username, password, image } = req.body;

      const { status, data } = await UserRepository.createUser(username, password, image);

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  async userLogin(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const { status, data } = await UserRepository.loginUser(username, password);

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data);
    } catch (error) {
      return res.sendStatus(400);
    }
  }
  async userGet(req: Request, res: Response) {
    const { secret_key } = req.body;

    if (!secret_key || secret_key !== process.env.SECRET_KEY) {
      return res.sendStatus(500);
    }
    const result = await client.query<QueryResponseUser>('SELECT * from "User"');

    return res.status(200).json(result.rows);
  }

  async userDelete(req: Request, res: Response) {
    try {
      const { password } = req.body;
      const { user } = res.locals;

      const { status, data } = await UserRepository.deleteUser(password, user);

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
}

export default new UserController();
