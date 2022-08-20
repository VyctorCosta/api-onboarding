import Joi from "joi";

export const PunctuationSchema = Joi.object<PunctuationType>({
  postId: Joi.number().required(),
  punctuation: Joi.number().required(),
});

export type PunctuationType = {
  postId: number;
  punctuation: number;
}