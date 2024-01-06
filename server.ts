import app from "./app";

// Middleware
const port: string | number = process.env.PORT || 5000;

process.on("uncaughtException", (err: Error) => {
  console.log(err.name, err.message);
  console.log("uncaught exceptions shutting down");

  process.exit(1);
});

let server: any;

process.on("unhandledRejection", (err: Error) => {
  console.log(err.name, err.message);
  console.log("unhandled rejections shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

// Start the server
server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
