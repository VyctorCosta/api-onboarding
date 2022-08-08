import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { client } from "@database";
import { UserSchema, UserLoginSchema } from "@DTOs";

class UserRepository {
  async createUser(username: string, password: string, image: string): Promise<string | Error> {
    try {
      const { error } = UserSchema.validate({ username, password, image }, { abortEarly: false });
      if (error) {
        return new Error(error.message);
      }

      const passwordEncrypted = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      await client.query(
        `INSERT INTO "User" (id, name, password, image) VALUES (uuid_generate_v4(), $1, $2, $3)`,
        [username, passwordEncrypted, image]
      );

      return "User created";
    } catch (error) {
      console.log(error);
      return new Error(error);
    }
  }
  
  async loginUser(username: string, password: string): Promise<{ token: string; username: string;} | Error> {
    const { error } = UserLoginSchema.validate({ username, password }, { abortEarly: false });
    if (error) {
      return new Error(error.message);
    }
    const { rows } = await client.query('SELECT * FROM "User" WHERE name=$1', [username])

    if (rows.length === 0) {
      return new Error("User doesn't exists!");
    }

    const user = rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return new Error("Incorrect password!")
    }
    
    const token = jwt.sign({ id: user.id, username: user.name}, process.env.SECRET_KEY, { expiresIn: "7d" });
    
    return {username: user.name, token};
  }
}

export default new UserRepository();
