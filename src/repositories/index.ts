import UserRepository from "./UserRepository";
import PostRepository from "./PostRepository";
import PunctuationRepository from "./PunctuationRepository";

interface QueryResponseUser {
  id: string;
  serialId: number;
  name: string;
  password: string;
  image: string;
}

interface PunctuationType {
  id: string | number;
  username: string;
  punctuation: number;
}

interface QueryResponseAllPunctuations extends PunctuationType {
  userId: string;
  postId: string;
  serialId: number;
}

interface PostsType {
  id: string | number;
  title: string;
  description: string;
  image: string;
  text: string;
  punctuations: PunctuationType[];
}

interface QueryResponseAllPosts extends PostsType {
  serialId: number;
}

export {
  UserRepository,
  PostRepository,
  PunctuationRepository,
  PostsType,
  QueryResponseAllPosts,
  QueryResponseUser,
  PunctuationType,
  QueryResponseAllPunctuations,
}