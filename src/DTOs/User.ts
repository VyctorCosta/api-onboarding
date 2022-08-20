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

export type UserType = {
  username: string;
  password: string;
  image: string;
};