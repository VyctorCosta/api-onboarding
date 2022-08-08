import { client } from "@database";
import { QueryResult } from "pg";

interface PostsType {
  id: string;
  title: string;
  description: string;
  image: string;
  text: string;
}


class PostRepository {
  async getAllPosts(): Promise<Error | QueryResult<PostsType>> {
    try {
      const result = await client.query<PostsType>('SELECT * from "Posts"')
      
      return result;
    } catch (error) {
      return new Error(error);
    }
  }

  // async createPost(userId: string) {
  //   asd
  // }
}

export default new PostRepository();