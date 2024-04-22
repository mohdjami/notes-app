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
