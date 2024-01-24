"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from 'fs';
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const notesRouter_1 = __importDefault(require("./routes/notesRouter"));
const app = (0, express_1.default)();
// middleware
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(`${__dirname}/public`));
// routes
// mounting the routers
app.use("/api/auth", authRouter_1.default);
app.use("/api", notesRouter_1.default);
// handling error middleware
app.use(errorController_1.default);
exports.default = app;
