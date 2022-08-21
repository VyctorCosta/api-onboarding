import { client } from "@database";
import { UserTypeJWT } from "@middlewares/validateToken";
import { QueryResponseAllPosts, QueryResponseComments, QueryResponseUser } from "@repositories";
// import { CommentsSchema } from "@DTOs";
import { v4 as uuidv4 } from "uuid";
import { CommentsSchema } from "../DTOs/Comments";
// import { CommentssType, QueryResponseAllCommentss, QueryResponseAllPunctuations } from "@repositories";

class CommentsRepository {
  async createCommentary(
    postId: number,
    commentary: string,
    user: UserTypeJWT
  ): Promise<{ status: number; data: { message: string } | Error }> {
    try {
      const { error } = CommentsSchema.validate({ postId, commentary });

      if (error) {
        return { status: 400, data: new Error(error.message) };
      }

      const {
        rows: [post],
      } = await client.query<QueryResponseAllPosts>('SELECT id FROM "Posts" WHERE "serialId"=$1', [
        postId,
      ]);

      if (!post) {
        return { status: 400, data: new Error("This post doesn't exists!") };
      }

      const {
        rows: [userDB],
      } = await client.query<QueryResponseUser>('SELECT image FROM "User" WHERE id=$1', [user.id]);

      await client.query(
        'INSERT INTO "Comments" (id, "userId", "postId", username, image, commentary) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5)',
        [user.id, post.id, user.name, userDB.image, commentary]
      );

      return { status: 201, data: { message: "Commentary Registered!" } };
    } catch (error) {
      return { status: 400, data: new Error(error.message) };
    }
  }

  async deleteComments(
    commentId: number,
    user: UserTypeJWT
  ): Promise<{ status: number; data: { message: string } | Error }> {
    try {
      if (!commentId) {
        return { status: 400, data: new Error("commentId is missing!") };
      }

      const {
        rows: [comments],
      } = await client.query<QueryResponseComments>('SELECT id, username FROM "Comments" WHERE "serialId"=$1', [
        commentId,
      ]);

      if (!comments) {
        return { status: 400, data: new Error("This comment does not exist!")};
      }

      if (comments.username !== user.name) {
        return { status: 401, data: new Error("It is not allowed to delete comments from other users!")};
      }

      await client.query('DELETE FROM "Comments" WHERE id=$1', [comments.id]);

      return { status: 200, data: { message: "Comment deleted successfully!" }};
    } catch (error) {
      return { status: 400, data: new Error(error.message) };
    }
  }
}

export default new CommentsRepository();
