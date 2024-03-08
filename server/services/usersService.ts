import { User } from "../db/model/user.model";
import { IUser } from "../db/types/db";
import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";
import { ApplicationError } from "../error/application-error";

const saveUser = async (userData: IUser) => {
    const user = new User(userData);
    user.password = await bcrypt.hash(user.password, 12);
    return user.save();
}

const updateUser = async (userID: string, userNewData: IUser) => {
    const user = await User.findById(userID);
    if (!user) {
        return `user with id: ${userID} Not found`;
    }
    user.address = userNewData.address;
    user.name = userNewData.name;
    user.image = userNewData.image;
    user.phone = userNewData.phone;

    return User.findByIdAndUpdate(userID, user, { new: true });
}

const patchUser = async (userID: string) => {
    const user = await User.findById(userID);
    if (!user) {
        return `user with id: ${userID} Not found`;
    }
    user.isBusiness = !user.isBusiness;
    const updatedUser = await User.findByIdAndUpdate(userID, user, { new: true });
    return { message: {isBusiness: updatedUser?.isBusiness} }
}

const getSecret = ()=>{
    return process.env.JWT_SECRET ?? "secret";
}
const login = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user)
        throw new ApplicationError(401,"Bad Credentials");
    const match = await bcrypt.compare(password, user.password);
    if (!match)
        throw new ApplicationError(401,"Bad Credentials");
    return jwt.sign({
            id: user._id, isAdmin: user.isAdmin, isBusiness: user.isBusiness },
        getSecret()
    );
}

export const usersService = { saveUser, updateUser, patchUser, login };

