// tests/integration.test.js
import request from "supertest";
import app from "../app";
import authRouter from "../routes/authRouter";
import notesRouter from "../routes/notesRouter";

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

describe("Integration Tests", () => {
  it("should create a new user, log in, and get a list of notes", async () => {
    // Create a new user
    const signupResponse = await request(app)
      .post("/api/auth/signup")
      .send({ email: "newtestuser2@test.com", password: "password" });

    expect(signupResponse.statusCode).toBe(201);

    // Log in
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email: "newtestuser2@test.com", password: "password" });

    expect(loginResponse.statusCode).toBe(200);
    const accessToken = loginResponse.body.token;

    //should create a new note
    const createNoteResponse = await request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ content: "New note content" });

    // Assert the status code
    expect(createNoteResponse.statusCode).toBe(201);

    // Assert the structure of the createNoteResponse body
    expect(createNoteResponse.body).toHaveProperty("message", "note created");
    expect(createNoteResponse.body).toHaveProperty("data");
    expect(createNoteResponse.body.data).toHaveProperty("note");

    // Assert properties of the newly created note
    const createdNote = createNoteResponse.body.data.note;
    expect(createdNote).toHaveProperty("id", createdNote.id);
    expect(createdNote).toHaveProperty("content", createdNote.content);
    expect(createdNote).toHaveProperty("userId", createdNote.userId);

    // Get a list of notes
    const notesResponse = await request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(notesResponse.statusCode).toBe(200);
    expect(Boolean(notesResponse.body)).toBe(true);

    //should get a note by id
    const getNoteByIdResponse = await request(app)
      .get(`/api/notes/${createdNote.id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    // Assert the status code
    expect(getNoteByIdResponse.statusCode).toBe(200);

    // Assert the structure of the getNoteByIdResponse body
    expect(getNoteByIdResponse.body).toHaveProperty("message", "note fetched");
    expect(getNoteByIdResponse.body).toHaveProperty("data");
    expect(getNoteByIdResponse.body.data).toHaveProperty("note");

    // Assert properties of the fetched note
    const fetchedNote = getNoteByIdResponse.body.data.note;
    expect(fetchedNote).toHaveProperty("id", fetchedNote.id);
    expect(fetchedNote).toHaveProperty("content", fetchedNote.content);
    expect(fetchedNote).toHaveProperty("userId", fetchedNote.userId);

    //should update a note by id
    const updateNoteByIdResponse = await request(app)
      .put(`/api/notes/${createdNote.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ content: "Updated note content 2" });

    // Assert the status code
    expect(updateNoteByIdResponse.statusCode).toBe(200);

    // Assert the structure of the updateNoteByIdResponse body
    expect(updateNoteByIdResponse.body).toHaveProperty(
      "message",
      "note updated"
    );
    expect(updateNoteByIdResponse.body).toHaveProperty("data");
    expect(updateNoteByIdResponse.body.data).toHaveProperty("note");

    // Assert properties of the updated note
    const updatedNote = updateNoteByIdResponse.body.data.note;
    expect(updatedNote).toHaveProperty("id", updatedNote.id);
    expect(updatedNote).toHaveProperty("content", updatedNote.content);
    expect(updatedNote).toHaveProperty("userId", updatedNote.userId);

    //share a note with another user
    const sharedNoteResponse = await request(app)
      .post(`/api/notes/${createdNote.id}/share`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ email: "jami2@gmail.com" });

    // Assert the status code
    expect(sharedNoteResponse.statusCode).toBe(200);

    // Assert the structure of the sharedNoteResponse body
    expect(sharedNoteResponse.body).toHaveProperty("message", "note shared");

    //should delete a note by id
    const deleteNoteResponse = await request(app)
      .delete(`/api/notes/${createdNote.id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(deleteNoteResponse.statusCode).toBe(200);
  }, 20000);
});
