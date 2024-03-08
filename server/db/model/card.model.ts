import { model } from "mongoose";
import { cardSchema } from "../schema/card.schema";

const Card = model("Card", cardSchema);

export { Card }