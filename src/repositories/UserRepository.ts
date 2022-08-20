import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { client } from "@database";
import { UserSchema, UserLoginSchema } from "@DTOs";
import { UserTypeJWT } from "@middlewares/validateToken";
import { QueryResponseUser } from "@repositories";

class UserRepository {
  async createUser(
    username: string,
    password: string,
    image: string
  ): Promise<{ status: number; data: { message: string } | Error }> {
    try {
      const { error } = UserSchema.validate({ username, password, image }, { abortEarly: false });
      if (error) {
        return { status: 400, data: new Error(error.message) };
      }

      const passwordEncrypted = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      await client.query(
        `INSERT INTO "User" (id, name, password, image) VALUES (uuid_generate_v4(), $1, $2, $3)`,
        [username, passwordEncrypted, image]
      );

      return { status: 201, data: { message: "User successfully created!" } };
    } catch (error) {
      console.log(error);
      return { status: 400, data: new Error(error) };
    }
  }

  async loginUser(
    username: string,
    password: string
  ): Promise<{ status: number; data: { token: string; name: string } | Error }> {
    const { error } = UserLoginSchema.validate({ username, password }, { abortEarly: false });
    if (error) {
      return { status: 400, data: new Error(error.message) };
    }
    const { rows } = await client.query<QueryResponseUser>('SELECT * FROM "User" WHERE name=$1', [
      username,
    ]);

    if (rows.length === 0) {
      return { status: 400, data: new Error("User doesn't exists!") };
    }

    const user = rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return { status: 401, data: new Error("Incorrect password!") };
    }

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    return { status: 200, data: { name: user.name, token } };
  }

  async deleteUser(
    password: string,
    user: UserTypeJWT
  ): Promise<{ status: number; data: { message: string } | Error }> {
    if (!password) {
      return { status: 400, data: new Error("No password was provided!") };
    }

    const {
      rows: [userDB],
    } = await client.query<QueryResponseUser>('SELECT * FROM "User" WHERE id=$1', [user.id]);

    if (!userDB) {
      return { status: 400, data: new Error("User doesn't exists!") };
    }

    if (!bcrypt.compareSync(password, userDB.password)) {
      return { status: 401, data: new Error("Incorrect password!") };
    }
    
    //* Taking all user posts and deleting...

    const { rows: posts } = await client.query<{ postId: string }>(
      'SELECT "postId" FROM "PostUser" WHERE "userId"=$1',
      [user.id]
    );

    posts.forEach(
      async ({ postId }) => await client.query('DELETE FROM "Posts" WHERE id=$1', [postId])
    );

    await client.query('DELETE FROM "User" WHERE id=$1', [userDB.id]);

    return { status: 200, data: { message: "User successfully deleted" } };
  }
}

export default new UserRepository();
