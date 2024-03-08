import { Schema } from "mongoose";
import { IRole } from "../types/db";

export const roleSchema = new Schema<IRole>({
    name: {
        type: String,
        unique: true,
        required: false,
        default: "user"
    },
});

export default roleSchema;
