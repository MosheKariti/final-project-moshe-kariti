import { model } from "mongoose";
import roleSchema from "../schema/role.schema";

const Role = model("Role",roleSchema);

export { Role };