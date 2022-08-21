import UserRepository from "./UserRepository";
import PostRepository from "./PostRepository";
import PunctuationRepository from "./PunctuationRepository";
import CommentsRepository from "./CommentsRepository";

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
  username: string;
  userImage: string;
  text: string;
  punctuations: PunctuationType[];
  comments: CommentsType[];
}

interface QueryResponseAllPosts extends PostsType {
  serialId: number;
}

interface CommentsType {
  id: string | number;
  username: string;
  image: string;
  commentary: string;
}

interface QueryResponseComments extends CommentsType {
  serialId: number;
  userId: string;
  postId: string;
}

export {
  UserRepository,
  PostRepository,
  PunctuationRepository,
  CommentsRepository,
  PostsType,
  QueryResponseAllPosts,
  QueryResponseUser,
  PunctuationType,
  QueryResponseAllPunctuations,
  QueryResponseComments,
};
