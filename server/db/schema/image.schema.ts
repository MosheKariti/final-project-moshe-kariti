import { Schema } from "mongoose";
import { IImage } from "../types/db";

export const imageSchema = new Schema<IImage>({
   url: {
       type: String,
       required: false,
       default: "https://picsum.photos/seed/picsum/200/300",
       maxlength: 100
   },
    alt: {
       type: String,
       required: false,
       default: "user avatar"
    }
});