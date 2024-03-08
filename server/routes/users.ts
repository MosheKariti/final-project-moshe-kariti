import { Router } from "express";
import { ILogin, IUser } from "../db/types/db";
import { validateLogin, validateUser } from "../middleware/validateSchema";
import { usersService } from "../services/usersService";
import { User } from "../db/model/user.model";
import { verifyAdmin } from "../middleware/verify-admin";
import { verifyUserOrAdmin } from "../middleware/verify-userOrAdmin";
import { verifyUser } from "../middleware/verify-user";

const router = Router();

router.post("/", validateUser, async (req, res, next) => {
    const body = req.body as IUser;
    try {
        const savedUser = await usersService.saveUser(body);
        return res.status(200).json(savedUser);
    } catch (e) {
        return res.status(400).json(e);
    }
});

router.post("/login", validateLogin, async (req, res, next) => {
    try {
        const {email, password} = req.body as ILogin;
        const token = await usersService.login(email, password);
        return res.status(200).json({token});
    } catch (e) {
        next(e);
    }
});

router.get("/", verifyAdmin, async (req, res, next) => {

    const users = await User.find();
    res.json(users);
});

router.get("/:id", verifyUserOrAdmin, async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({message: `user with id: ${id} Not found`})
        }
        res.json(user);
    } catch (e) {
        next(e)
    }
});

router.put("/:id", verifyUser, async (req, res, next) => {
    try {
        const dataToUpdate = req.body as IUser;
        const userId = req.params.id;
        const updateUser = await usersService.updateUser(userId, dataToUpdate);
        return res.status(200).json(updateUser);
    } catch (e) {
        return res.status(400).json(e);
    }
});

router.patch("/:id", verifyUser, async (req, res, next) => {
    try {
        const userId = req.params.id;
        const patchUser = await usersService.patchUser(userId);
        return res.status(200).json(patchUser);
    } catch (e) {
        return res.status(400).json(e);
    }
});

router.delete("/:id", verifyUserOrAdmin, async (req, res, next) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({message: 'User not found'});
        } else {
            res.status(200).json(deletedUser);
        }
    } catch (e) {
        return res.status(500).json(e);
    }
});

export default router;
