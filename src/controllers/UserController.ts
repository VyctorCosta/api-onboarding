import { Request, Response } from "express";
import { userRepository } from "@repositories";
import { client } from "@database";

class UserController {
  async userPost(req: Request, res: Response) {
    try {
      const { username, password, image } = req.body;
  
      const result = await userRepository.createUser(username, password, image);
  
      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }
      
      return res.status(200).json({ message: result });
    } catch (error) {
      console.log(error)
      return res.status(400);
    }
  }

  async userLogin(req: Request, res: Response) {
    try {
      const { username, password, } = req.body;

      const result = await userRepository.loginUser(username, password);

      if (result instanceof Error) {
        return res.status(400).json(result.message);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400);
    }
  }
  //! Delete isso
  async userGet(req: Request, res: Response) {
    const result = await client.query('SELECT * from "User"');

    return res.status(200).json(result.rows);
  }
}
// export async function userGet(req: Request, res: Response) {
//   try {
    
//   } catch (error) {
//     console.log(error)
//     return res.status(400);
//   }
// }

export default new UserController();