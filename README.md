# My Awesome RESTful API

## Overview

This RESTful API is built with Express and utilizes Supabase and Prisma ORM for database operations. It includes features such as user authentication, authorization, rate limiting, request throttling, and a powerful search functionality based on text indexing for high performance. The application is thoroughly tested with Jest and Supertest, ensuring the reliability of all API endpoints.

## Features

### 1. RESTful API

Implemented a RESTful API using the Express framework for building web applications and APIs in Node.js.

### 2. Database

Utilized Supabase, a powerful and scalable database, and Prisma ORM for efficient data storage and retrieval.

### 3. User Authentication and Authorization

Implemented user authentication and authorization to secure access to various endpoints.

### 4. Rate Limiting and Request Throttling

Included rate limiting and request throttling mechanisms to handle high traffic, ensuring optimal performance and resource utilization.

### 5. Search Functionality

Implemented a robust search functionality allowing users to search for notes based on keywords. Text indexing has been employed for high-performance search operations.

## Testing

The application is thoroughly tested using Jest, a popular JavaScript testing framework, and Supertest for integration testing. Unit tests and integration tests cover all API endpoints, ensuring the reliability and correctness of the application.

## Getting Started

## Overview

This RESTful API allows users to manage their notes, including creating, updating, and deleting notes. Additionally, users can share notes with others and search for notes based on keywords.

## Authentication

### 1. Sign Up

#### Endpoint

POST /api/auth/signup

bash

#### Request

````json
{
  "email": "user@example.com"
}

Response

json

{
  "token": "<your-access-token>",
  "status": "success",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}

2. Login
Endpoint

bash

POST /api/auth/login

Request

json

{
  "email": "user@example.com"
}

Response

json

{
  "token": "<your-access-token>",
  "status": "success",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}

Note Endpoints
3. Get All Notes
Endpoint

bash

GET /api/notes

Request

json

Headers:
  Authorization: Bearer <your-access-token>

Response

json

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
Endpoint

bash

GET /api/notes/:id

Request

json

Headers:
  Authorization: Bearer <your-access-token>
Params:
  id: Note ID

Response

json

{
  "id": 1,
  "content": "Note content 1"
}

5. Create New Note
Endpoint

bash

POST /api/notes

Request

json

Headers:
  Authorization: Bearer <your-access-token>
Body:

```json
{
  "content": "New note content"
}

Response

json

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
Endpoint

bash

PUT /api/notes/:id

Request

json

Headers:
  Authorization: Bearer <your-access-token>
Params:
  id: Note ID
Body:

```json
{
  "content": "Updated note content"
}

Response

json

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
Endpoint

bash

DELETE /api/notes/:id

Request

json

Headers:
  Authorization: Bearer <your-access-token>
Params:
  id: Note ID

Response

yaml

Status: 204 No Content

8. Share Note with Another User
Endpoint

bash

POST /api/notes/:id/share

Request

json

Headers:
  Authorization: Bearer <your-access-token>
Params:
  id: Note ID
Body:

```json
{
  "email": "email@example.com"
}

Response

json

{
  "message": "note shared"
}

9. Search for Notes
Endpoint

sql

GET /api/search?q=:query

Request

json

Headers:
  Authorization: Bearer <your-access-token>
Query:
  q: Search query

Response

json

[
  {
    "id": 1,
    "content": "Note content 1"
  },
  {
    "id": 3,
    "content": "Updated note content"
  }
]

Error Responses

    400 Bad Request: Invalid request format or missing required parameters.
    401 Unauthorized: Invalid or missing authentication token.
    403 Forbidden: The authenticated user does not have permission for the requested action.
    404 Not Found: The requested resource (note or user) was not found.
    500 Internal Server Error: An unexpected server error occurred.

Unit Tests

Unit tests have been implemented to ensure the correctness of each endpoint. The tests cover various scenarios, including success cases and error responses.

To run the unit tests, follow the instructions in the Testing section.
Testing

To run the unit tests, use the following command:

bash

npm test

markdown

## Development Environment

To set up the development environment, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git

    Install dependencies:

bash

cd your-repo
npm install

    Check Node.js version:

Ensure that you have Node.js version 14.0.0 or newer installed. You can use NVM (Node Version Manager) or install it manually.

bash

# Example using NVM
nvm use

    Set up the environment variables:

Create a .env file in the root directory and add the following variables:

env

PORT=3000
DATABASE_URL=your-database-url
SECRET_KEY=your-secret-key

Replace your-database-url and your-secret-key with your actual database URL and a secret key for token generation.

    Run the development server:

bash

npm start

The API will be accessible at http://localhost:3000
````
