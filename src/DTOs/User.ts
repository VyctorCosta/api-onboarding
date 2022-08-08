import Joi from "joi";

export const UserSchema = Joi.object<UserType>({
  username: Joi.string().required(),
  password: Joi.string().required(),
  image: Joi.string().required(),
});

export const UserLoginSchema = Joi.object<UserType>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const UserSchemaUpdate = Joi.object<UserType>({
  username: Joi.string(),
  password: Joi.string(),
  image: Joi.string(),
});

export type UserType = {
  username: string;
  password: string;
  image: string;
};