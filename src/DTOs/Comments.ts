import Joi from "joi";

export const CommentsSchema = Joi.object<CommentsType>({
  postId: Joi.number().required(),
	commentary: Joi.string().required(),
});

export type CommentsType = {
  postId: number;
	commentary: string;
};