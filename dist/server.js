"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// Middleware
const port = process.env.PORT || 5000;
process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("uncaught exceptions shutting down");
    process.exit(1);
});
let server;
process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("unhandled rejections shutting down");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
});
// Start the server
server = app_1.default.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
