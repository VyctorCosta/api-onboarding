import Joi from "joi";

export const PostSchema = Joi.object<PostType>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  text: Joi.string().required(),
});

export type PostType = {
  title: string;
  description: string;
  image: string;
  text: string;
}