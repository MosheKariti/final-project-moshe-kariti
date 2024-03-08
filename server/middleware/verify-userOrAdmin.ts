import { RequestHandler } from "express";
import { ApplicationError } from "../error/application-error";
import jwt from "jsonwebtoken";
import { RequestUser } from "../@types/express";

export const verifyUserOrAdmin: RequestHandler = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        throw new ApplicationError(400, "No Auth Header");
    }
    const token = header.split(" ")[1];
    const secret = process.env.JWT_SECRET ?? "";
    try {
        req.user = jwt.verify(token, secret) as RequestUser;
        if (req.user?.isAdmin) {
           return next();
        }
        if (req.params.id === req.user?.id) {
            return next();
        }
        throw new ApplicationError(401, "Only Admin or the user");
    } catch (e) {
        next(e);
    }
};

