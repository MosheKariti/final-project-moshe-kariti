import { model } from "mongoose";
import { userSchema } from "../schema/user.schema";

const User = model('User',userSchema);

export { User };

