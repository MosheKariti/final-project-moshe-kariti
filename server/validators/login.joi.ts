import Joi from "joi";
import { ILogin } from "../db/types/db";
import { patterns } from "./regex-patterns";

export const joiLoginSchema = Joi.object<ILogin>({
    email: Joi.string().email().min(5).max(30).required(),
    password: Joi.string().pattern(patterns.password)
        .min(7)
        .max(20)
        .required()
});