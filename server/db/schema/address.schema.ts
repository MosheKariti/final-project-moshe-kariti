import { Schema } from "mongoose";
import { IAddress } from "../types/db";

export const addressSchema = new Schema<IAddress>({
    city: {
        type: String,
        required: true,
        maxlength: 50
    },
    country: {
        type: String,
        required: true,
        maxlength: 50
    },
    houseNumber: {
        type: Number,
        required: true,
        maxlength: 4
    },
    zip: {
        type: Number,
        required: false,
        default: 0
    },
    state: {
        type: String,
        required: false,
        default: "",
        maxlength: 30
    },
    street: {
        type: String,
        required: true,
        maxlength: 100
    }
});