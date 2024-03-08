import { Schema } from "mongoose";
import { IUser } from "../types/db";
import { addressSchema } from "./address.schema";
import { nameSchema } from "./name.schema";
import { imageSchema } from "./image.schema";

export const userSchema = new Schema<IUser>({
    address: {
      type: addressSchema,
      required: true
    },
    name: {
        type: nameSchema,
        required: true
    },
    image: {
        type: imageSchema,
        required: false,
        default: {
            url: ""
        }
    },
    email: {
        unique: true,
        type: String,
        required: true,
        maxlength: 100
    },
    isBusiness: {
        type: Boolean,
        required: false,
        default: false
    },
    password: {
        type: String,
        required: true,
        maxlength: 100
    },
    phone: {
        type: String,
        required: true,
        maxlength: 100
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false
    }
});