import { createNote } from "./../controllers/notesController";
// tests/notesRouter.test.js
import request from "supertest";
import app from "../app";

describe("Note Endpoints", () => {
  let accessToken: any; // I will use this to store the access token obtained during login
  let createdNote: any;
  beforeAll(async () => {
    // Log in to get the access token
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "jami3@gmail.com", password: "123123" });

    accessToken = loginResponse.body.token;
  });

  it("should create a new note", async () => {
    const response = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ content: "New note content" });

    // Assert the status code
    expect(response.statusCode).toBe(201);

    // Assert the structure of the response body
    expect(response.body).toHaveProperty("message", "note created");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("note");

    // Assert properties of the newly created note
    createdNote = response.body.data.note;
    expect(createdNote).toHaveProperty("id");
    expect(createdNote).toHaveProperty("content", createdNote.content);
    expect(createdNote).toHaveProperty("userId", createdNote.userId);
  });

  it("should get a list of notes related to the user", async () => {
    const response = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    expect(Boolean(response.body)).toBe(true);
  });

  it("should get a note by ID", async () => {
    const response = await request(app)
      .get(`/api/notes/${createdNote.id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    // Assert the status code
    expect(response.statusCode).toBe(200);

    // Assert the structure of the response body
    expect(response.body).toHaveProperty("message", "note fetched");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("note");

    // Assert properties of the fetched note
    const fetchedNote = response.body.data.note;
    expect(fetchedNote).toHaveProperty("id", fetchedNote.id);
    expect(fetchedNote).toHaveProperty("content", fetchedNote.content);
    expect(fetchedNote).toHaveProperty("userId", fetchedNote.userId);
  });

  it("should update an existing note by ID", async () => {
    const response = await request(app)
      .put(`/api/notes/${createdNote.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ content: "Updated note content 2" });

    // Assert the status code
    expect(response.statusCode).toBe(200);

    // Assert the structure of the response body
    expect(response.body).toHaveProperty("message", "note updated");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("note");

    // Assert properties of the updated note
    const updatedNote = response.body.data.note;
    expect(updatedNote).toHaveProperty("id", updatedNote.id);
    expect(updatedNote).toHaveProperty("content", updatedNote.content);
    expect(updatedNote).toHaveProperty("userId", updatedNote.userId);
  });

  it("should share a note with another user", async () => {
    const response = await request(app)
      .post(`/api/notes/${createdNote.id}/share`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ email: "jami2@gmail.com" });

    // Assert the status code
    expect(response.statusCode).toBe(200);

    // Assert the structure of the response body
    expect(response.body).toHaveProperty("message", "note shared");
  });

  it("should delete a note by ID", async () => {
    const response = await request(app)
      .delete(`/api/notes/${createdNote.id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });
});
