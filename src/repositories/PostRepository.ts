import { client } from "@database";
import { UserTypeJWT } from "@middlewares/validateToken";
import { PostSchema } from "@DTOs";
import { v4 as uuidv4 } from "uuid";
import {
  PostsType,
  QueryResponseAllPosts,
  QueryResponseAllPunctuations,
  QueryResponseComments,
  QueryResponseUser,
} from "@repositories";

class PostRepository {
  async getAllPosts(): Promise<{ status: number; data: PostsType[] | Error }> {
    try {
      const { rows: result } = await client.query<QueryResponseAllPosts>('SELECT * from "Posts"');
      const { rows: allPunctuations } = await client.query<QueryResponseAllPunctuations>(
        'SELECT * FROM "Punctuation"'
      );
      const { rows: allComments } = await client.query<QueryResponseComments>(
        'SELECT * FROM "Comments"'
      );

      return {
        status: 200,
        data: result.map(({ serialId, ...rest }) => ({
          ...rest,
          id: serialId,
          punctuations: allPunctuations
            .filter(({ postId }) => postId === rest.id)
            .map(({ serialId, username, punctuation }) => ({
              id: serialId,
              username,
              punctuation,
            })),
          comments: allComments
            .filter(({ postId }) => postId === rest.id)
            .map(({ serialId, username, image, commentary }) => ({
              id: serialId,
              username,
              image,
              commentary,
            })),
        })),
      };
    } catch (error) {
      return { status: 400, data: new Error(error) };
    }
  }

  async createPost(
    title: string,
    description: string,
    image: string,
    text: string,
    user: UserTypeJWT
  ): Promise<{ status: number; data: PostsType | Error }> {
    try {
      const { error } = PostSchema.validate({ title, description, image, text });

      if (error) {
        return { status: 400, data: new Error(error.message) };
      }

      const { rows: [userDB]} = await client.query<QueryResponseUser>('SELECT name, image FROM "User" WHERE id=$1', [user.id]);
      
      if (!userDB) {
        return { status: 400, data: new Error("User doesn't exists!") }
      }

      const postId = uuidv4();
      await client.query(
        'INSERT INTO "Posts" (id, title, description, "postImage", username, "userImage", text) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [postId, title, description, image, userDB.name, userDB.image, text]
      );

      await client.query('INSERT INTO "PostUser" ("userId", "postId") VALUES ($1, $2)', [
        user.id,
        postId,
      ]);

      const {
        rows: [{ serialId }],
      } = await client.query<{ serialId: number }>('SELECT "serialId" from "Posts" WHERE id=$1', [
        postId,
      ]);

      return {
        status: 201,
        data: {
          id: serialId,
          title,
          description,
          image,
          username: userDB.name,
          userImage: userDB.image,
          text,
          punctuations: [],
          comments: [],
        },
      };
    } catch (error) {
      return { status: 400, data: new Error(error.message) };
    }
  }

  async getOnePost(id: number): Promise<{ status: number; data: PostsType | Error }> {
    try {
      const {
        rows: [result],
      } = await client.query<QueryResponseAllPosts>('SELECT * FROM "Posts" WHERE "serialId"=$1', [
        id,
      ]);
      const { rows: allPunctuations } = await client.query<QueryResponseAllPunctuations>(
        'SELECT * FROM "Punctuation"'
      );
      const { rows: allComments } = await client.query<QueryResponseComments>(
        'SELECT * FROM "Comments"'
      );

      if (!result) {
        return { status: 400, data: new Error("User doesn't exists!") };
      }

      const { serialId, ...rest } = result;

      return {
        status: 200,
        data: {
          ...rest,
          id: serialId,
          punctuations: allPunctuations
            .filter(({ postId }) => postId === rest.id)
            .map(({ serialId, username, punctuation }) => ({
              id: serialId,
              username,
              punctuation,
            })),
          comments: allComments
            .filter(({ postId }) => postId === rest.id)
            .map(({ serialId, username, image, commentary }) => ({
              id: serialId,
              username,
              image,
              commentary,
            })),
        },
      };
    } catch (error) {
      return { status: 400, data: new Error(error.message) };
    }
  }

  async deletePost(
    id: number,
    user: UserTypeJWT
  ): Promise<{ status: number; data: { message: string } | Error }> {
    try {
      const {
        rows: [post],
      } = await client.query<{ id: string }>('SELECT id from "Posts" WHERE "serialId"=$1', [id]);

      if (!post) {
        return { status: 400, data: new Error("Post doesn't exist!") };
      }

      const {
        rows: [{ userId }],
      } = await client.query<{ userId: string }>(
        'SELECT "userId" from "PostUser" WHERE "postId"=$1',
        [post.id]
      );

      if (userId !== user.id) {
        return { status: 401, data: new Error("This token is not allowed to delete this post!") };
      }

      await client.query('DELETE FROM "Posts" WHERE "serialId"=$1', [id]);

      return { status: 200, data: { message: "Post deleted sucessfully!" } };
    } catch (error) {
      return { status: 400, data: new Error(error.message) };
    }
  }
}

export default new PostRepository();
