import { client } from "@database";
import { UserTypeJWT } from "@middlewares/validateToken";
import { QueryResponseAllPosts, QueryResponseAllPunctuations } from "@repositories";
import { PunctuationSchema } from "../DTOs/Punctuation";

class PunctuationRepository {
  async getAllPunctuations(): Promise<{
    status: number;
    data: QueryResponseAllPunctuations[] | Error;
  }> {
    try {
      const { rows: punctuations } = await client.query<QueryResponseAllPunctuations>(
        'SELECT * FROM "Punctuation"'
      );

      return { status: 200, data: punctuations };
    } catch (error) {
      return { status: 400, data: new Error(error.message) };
    }
  }

  async createPunctuation(
    punctuation: number,
    postId: string,
    user: UserTypeJWT
  ): Promise<{ status: number; data: { message: string } | Error }> {
    try {
      const { error } = PunctuationSchema.validate({ punctuation, postId });

      if (error) {
        return { status: 400, data: new Error(error.message) };
      }

      if (punctuation < 1 || punctuation > 5) {
        return { status: 400, data: new Error("the punctuation must be between 1 and 5!") };
      }

      const { rows: [post]} = await client.query<QueryResponseAllPosts>('SELECT * FROM "Posts" WHERE "serialId"=$1', [postId]);

      if (!post) {
        return { status: 400, data: { message: "This post doesn't exists!"}}
      }
      console.log(user)

      await client.query(
        'INSERT INTO "Punctuation" ("userId", "postId", username, punctuation) VALUES ($1, $2, $3, $4)',
        [user.id, post.id, user.name, punctuation]
      );

      return { status: 201, data: { message: "Punctuation registered!" } };
    } catch (error) {
      if (error.message.includes('Punctuation_pk')) {
        return { status: 401, data: new Error("This user already has a punctuation recorded!") };
      }
      return { status: 400, data: new Error(error.message) };
    }
  }
}

export default new PunctuationRepository();
