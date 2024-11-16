# Notes-Management  API with Authentication

A RESTful API for managing personal notes with secure user authentication. Built with Node.js, Express, and MongoDB.

## Features

- User authentication (signup/login) with JWT
- Password encryption using bcrypt
- CRUD operations for notes
- Per-user note isolation
- Input validation and error handling

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcryptjs for password hashing
- **Validation**: express-validator

## API Endpoints

### Authentication Routes
```
POST /api/auth/createuser - Create a new user account
POST /api/auth/login     - Login with existing credentials
POST /api/auth/getuser   - Get user details (requires authentication)
```

### Notes Routes
```
GET    /api/notes/fetchallnotes - Get all notes for logged-in user
POST   /api/notes/addnote      - Create a new note
PUT    /api/notes/updatenote/:id - Update an existing note
DELETE /api/notes/deletenote/:id - Delete a note
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```
   JWT_SECRET=your_jwt_secret_here
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes:
1. Login/Signup to receive an auth token
2. Include the token in the request header:
   ```
   auth-token: your_jwt_token_here
   ```

## Data Models

### User Schema
- name (String, required)
- email (String, required, unique)
- password (String, required)
- date (Date, default: current date)

### Notes Schema
- user (ObjectId, reference to User)
- title (String, required)
- description (String, required)
- tag (String, default: "General")
- date (Date, default: current date)

## Security Features

- Passwords are hashed using bcrypt with salt
- JWT for stateless authentication
- Input validation for all routes
- Protected routes using middleware
- Email uniqueness validation
- Minimum length requirements for passwords

## Error Handling

The API includes comprehensive error handling for:
- Invalid input validation
- Authentication errors
- Database errors
- Server errors
- Resource not found errors

## Input Validation

- **User Creation**:
  - Name: Minimum 3 characters
  - Email: Valid email format
  - Password: Minimum 5 characters

- **Notes**:
  - Title: Minimum 3 characters
  - Description: Minimum 5 characters

