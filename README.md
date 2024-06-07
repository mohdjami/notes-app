# My Awesome RESTful API

## Overview

This RESTful API is constructed using Express and incorporates Supabase and Prisma ORM for database operations. It boasts features such as user authentication, authorization, rate limiting, request throttling, and a potent search functionality based on text indexing for high performance. The application undergoes thorough testing with Jest and Supertest, ensuring the reliability of all API endpoints.

## Features

1. **RESTful API**

   - Implemented a RESTful API using the Express framework for building web applications and APIs in Node.js.

2. **Database**

   - Leveraged Supabase, a powerful and scalable database, and Prisma ORM for efficient data storage and retrieval.

3. **User Authentication and Authorization**

   - Implemented user authentication and authorization to secure access to various endpoints.

4. **Rate Limiting and Request Throttling**

   - Included rate limiting and request throttling mechanisms to handle high traffic, ensuring optimal performance and resource utilization.

5. **Search Functionality**
   - Implemented a robust search functionality allowing users to search for notes based on keywords. Text indexing has been employed for high-performance search operations.

## Testing

The application is thoroughly tested using Jest, a popular JavaScript testing framework, and Supertest for integration testing. Unit tests and integration tests cover all API endpoints, ensuring the reliability and correctness of the application.

## Getting Started

### Authentication

#### 1. Sign Up

- **Endpoint:** `POST /api/auth/signup`

```json
# Request
{
"email": "user@example.com"
}

# Response
{
"token": "<user-access-token>",
"status": "success",
"user": {
"id": 1,
"email": "user@example.com"
}
}

2. Login

   Endpoint: POST /api/auth/login

# Request

{
"email": "user@example.com"
}

# Response

{
"token": "<user-access-token>",
"status": "success",
"user": {
"id": 1,
"email": "user@example.com"
}
}

Note Endpoints 3. Get All Notes

    Endpoint: GET /api/notes

# Request

Headers:
Authorization: Bearer <user-access-token>

# Response

[
{
"id": 1,
"content": "Note content 1"
},
{
"id": 2,
"content": "Note content 2"
}
]


4. Get Note by ID

   Endpoint: GET /api/notes/:id

# Request

Headers:
Authorization: Bearer <user-access-token>
Params:
id: Note ID

# Response

{
"id": 1,
"content": "Note content 1"
}

5. Create New Note

   Endpoint: POST /api/notes

# Request

Headers:
Authorization: Bearer <user-access-token>
Body:
{
"content": "New note content"
}

# Response

{
"data": {
"note": {
"content": "new note content",
"id": 6,
"userId": 3
}
},
"message": "note created"
}

6. Update Note by ID

   Endpoint: PUT /api/notes/:id

# Request

Headers:
Authorization: Bearer <user-access-token>
Params:
id: Note ID
Body:
{
"content": "Updated note content"
}

# Response

{
"data": {
"note": {
"content": "old note content",
"id": 6,
"userId": 3
}
},
"message": "note updated"
}

7. Delete Note by ID

   Endpoint: DELETE /api/notes/:id

# Request

Headers:
Authorization: Bearer <user-access-token>
Params:
id: Note ID

# Response

Status: 204 No Content

8. Share Note with Another User

   Endpoint: POST /api/notes/:id/share

# Request

Headers:
Authorization: Bearer <user-access-token>
Params:
id: Note ID
Body:
{
"email": "email@example.com"
}

# Response

{
"message": "note shared"
}

9. Search for Notes

   Endpoint: GET /api/search?q=:query

# Request

Headers:
Authorization: Bearer <user-access-token>
Query:
q: Search query

# Response

[
{
"id": 1,
"content": "Note content 1"
},
{
"id": 3,
"content": "Updated content 2"
}
]

```

Error Responses

- 400 Bad Request: Invalid request format or missing required parameters.
- 401 Unauthorized: Invalid or missing authentication token.
- 403 Forbidden: The authenticated user does not have permission for the requested action.
- 404 Not Found: The requested resource (note or user) was not found.
- 500 Internal Server Error: An unexpected server error occurred.

Unit Tests

Unit tests have been implemented to ensure the correctness of each endpoint. The tests cover various scenarios, including success cases and error responses.

To run the unit tests, follow the instructions in the Testing section.

Testing

To run the unit tests, use the following command:

```bash
npm test
```

Development Environment

To set up the development environment, follow these steps:

Clone the repository:

```bash
git clone https://github.com/mohdjami/notes-app.git
```

Install dependencies:

```bash
cd your-repo
npm install
```

Dont forget to setup Prisma

```bash
npx prisma generate
```

Check Node.js version:
Ensure that you have Node.js version 21.0.0 or latest installed. You can use NVM (Node Version Manager) or install it manually.

```bash
# Example using NVM
nvm use
```

# API DOCUMENTATION WITH POSTMAN

Please refer https://documenter.getpostman.com/view/26354863/2s9YynnQ2g
