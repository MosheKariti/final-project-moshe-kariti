import express from "express";
import { config } from "dotenv";
import usersRouter from "./routes/users";
import cardsRouter from "./routes/cards";
import { connect } from "./db/utils/connection";
import {errorHandler} from "./middleware/errorHandler";
import { morganMiddleware } from './middleware/logger';
import cors from 'cors';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.prod' });
} else {
    dotenv.config({path: '.env.dev'});
}

config();
connect();
const app = express();

const allowedOrigins = [
    'http://localhost:3000',
];
const corsOptions = {
    origin: allowedOrigins
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(morganMiddleware);
app.use(express.static("public"));
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use(errorHandler);
app.use((req, res) => {
    res.status(404).json('Not Found');
})

const PORT = process.env.EXPRESS_PORT;

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});
