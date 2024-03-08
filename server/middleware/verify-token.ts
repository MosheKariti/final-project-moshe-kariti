import { RequestHandler } from "express";
import { ApplicationError } from "../error/application-error";
import jwt from "jsonwebtoken";
import { RequestUser } from "../@types/express";

export const verifyToken: RequestHandler = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        throw new ApplicationError(400, "No Auth Header");
    }
    const token = header.split(" ")[1];
    const secret = process.env.JWT_SECRET ?? "";
    try {
        const payload = jwt.verify(token, secret) as RequestUser
        req.user = payload;
        next();
    } catch (e) {
        throw new ApplicationError(500, "...");
    }
};
