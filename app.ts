// import fs from 'fs';
import express, { Express } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRouter";
import globalErrorHandler from "./controllers/errorController";
import notesRoutes from "./routes/notesRouter";
const app: Express = express();

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
import helmet from "helmet";
const xss = require("xss-clean");
import hpp from "hpp";
import mongoSanitize = require("express-mongo-sanitize");

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//limiting the number of requests from the same IP
const Limitter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "too many requests from this IP please try again in an hour",
});
app.use("/api", Limitter);
//body parser reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
//data sanitization against NoSQL query injection
app.use(mongoSanitize());
//data sanitization against XSS
app.use(xss());
//prwent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsAverage",
      "ratingsQuantity",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);
//data sanitization against NoSQL query injection
//serving static files
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

// routes

app.get("/", (req, res) => {
  res.send("API is running....");
});

// mounting the routers
app.use("/api/auth", authRoutes);
app.use("/api", notesRoutes);
// handling error middleware
app.use(globalErrorHandler);

export default app;
