import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { sessionMiddleware } from "./config/session.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// base route shows a welcome message DELETE THIS you don't need it //
app.use("/", (req, res, next) => {
    res.send(
    `
        <h1 
            style='margin:0; height: 100%;
            display: flex; 
            place-items: center;
            place-content: center;
            background: #242424;
            color: white;'
        >

                Welcome to TS x Express Template
        
        </h1>
    `
);
} );

// api routes
app.use("/api", routes);

app.use(errorHandler);

export default app;
