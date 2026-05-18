import express from "express";
import cors, {CorsOptions} from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { sessionMiddleware } from "./config/session.js";
import { env } from "./config/env.js";

const app = express();

const allowedOrigins: string[] = [
  env.CLIENT_URL
];

// Strongly typed CORS config
const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    // allow server-to-server / curl / postman
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// api routes
app.use("/api", routes);

app.use(errorHandler);

export default app;
