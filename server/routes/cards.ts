import { Router } from "express";
import { verifyAdmin } from "../middleware/verify-admin";
import { User } from "../db/model/user.model";
import { Card } from "../db/model/card.model";
import { verifyUser } from "../middleware/verify-user";
import jwt from "jsonwebtoken";
import { validateCard } from "../middleware/validateSchema";
import { ICard } from "../db/types/db";
import { ApplicationError } from "../error/application-error";
import { RequestUser } from "../@types/express";
import { ObjectId } from 'mongodb';
import { verifyBusinessUser } from "../middleware/verify-business-user";
import { verifyToken } from "../middleware/verify-token";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const cards = await Card.find();
        return res.status(200).json(cards);
    } catch (e) {
        return res.status(400).json(e);
    }
});

router.get("/my-cards", async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        throw new ApplicationError(400, "No Auth Header");
    }
    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET ?? "";
    const requestUser = jwt.verify(token, secret) as RequestUser;
    try {
        const myCards = await Card.find({user_id: requestUser.id});
        return res.status(200).json(myCards);
    } catch (e) {
        return res.status(400).json(e);
    }
});

router.get("/:id", async (req, res, next) => {
    const cardId = req.params.id;
    try {
        const card = await Card.findById(cardId);
        return res.status(200).json(card);
    } catch (e) {
        return res.status(400).json(e);
    }
});

router.post("/", verifyBusinessUser, validateCard, async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        throw new ApplicationError(400, "No Auth Header");
    }
    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET ?? "";
    const requestUser = jwt.verify(token, secret) as RequestUser;
    const body = req.body as ICard;
    body.user_id = new ObjectId(requestUser.id);
    const card = new Card(body);
    try {
        const saveCard = await card.save();
        return res.status(200).json(saveCard);
    } catch (e) {
        return res.status(400).json(e);
    }
});

router.put("/:id", verifyBusinessUser, async (req, res, next) => {
    try {
        const dataToUpdate = req.body as ICard;
        const cardId = req.params.id;
        const card = await Card.findById(cardId);
        if (!card) {
            return `Card with id: ${cardId} Not found`;
        }
        card.title = dataToUpdate.title;
        card.subtitle = dataToUpdate.subtitle;
        card.description = dataToUpdate.description;
        card.phone = dataToUpdate.phone;
        card.email = dataToUpdate.email;
        card.web = dataToUpdate.web;
        card.image = dataToUpdate.image;
        card.address = dataToUpdate.address;

        const updatedCard = await Card.findByIdAndUpdate(cardId, card, {new: true});
        return res.status(200).json(updatedCard);
    } catch (e) {
        return res.status(400).json(e);
    }
});

router.patch("/:id", verifyToken, async (req, res, next) => {
    const user = req.user;
    const cardId = req.params.id;
    try {
        const card = await Card.findById(cardId);
        if (card && user) {
            const index = card.likes.indexOf(user.id);
            if (index != -1) {
                card.likes.splice(index, 1);
            } else {
                card.likes.push(user.id);
            }
            const saveCard = await card.save();
            return res.status(200).json(saveCard);
        }
    } catch (e) {
        return res.status(400).json(e);
    }
});

router.delete("/:id", verifyToken, async (req, res, next) => {
    const user = req.user;
    const cardId = req.params.id;
    try {
        const card = await Card.findById(cardId);
        if (card && user) {
            if (card.user_id.toString() === user.id || user.isAdmin) {
                const deleteCard = await Card.findByIdAndDelete(card.id);
                return res.status(200).json(deleteCard);
            }
        }
    } catch (e) {
        return res.status(400).json(e);
    }
});

export default router;