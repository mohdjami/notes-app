// tests/authRouter.test.js
import request from "supertest";
import app from "../app";

describe("Authentication Endpoints", () => {
  it("should create a new user", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({ email: "test5@5test.com", password: "password" });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });

  it("should log in an existing user", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test5@5gmail.com", password: "123123" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });
});
