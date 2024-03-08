import { Schema } from "mongoose";
import { IName } from "../types/db";

export const nameSchema = new Schema<IName>({
   first: {
       type: String,
       required: true,
       minlength: 2,
       maxlength: 25
   },
   middle: {
       type: String,
       required: false,
       default: "",
       maxlength: 25
   },
   last: {
       type: String,
       required: true,
       minlength: 2,
       maxlength: 25
   }
});