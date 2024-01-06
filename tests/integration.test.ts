// tests/integration.test.js
import request from "supertest";
import app from "../app";
import authRouter from "../routes/authRouter";
import notesRouter from "../routes/notesRouter";

// Use the routers in your Express app
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

describe("Integration Tests", () => {
  it("should create a new user, log in, and get a list of notes", async () => {
    // Create a new user
    const signupResponse = await request(app)
      .post("/api/auth/signup")
      .send({ email: "test12@example.com", password: "password" });

    expect(signupResponse.statusCode).toBe(201);

    // Log in
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "jami3@gmail.com", password: "123123" });

    expect(loginResponse.statusCode).toBe(200);
    const accessToken = loginResponse.body.token;
    console.log("access token", accessToken);
    // Get a list of notes
    const notesResponse = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(notesResponse.statusCode).toBe(200);
    expect(Boolean(notesResponse.body)).toBe(true);
  });

  // Add more integration tests for other scenarios
});
