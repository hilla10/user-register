# User Registration Backend

This is a Node.js backend for user registration and authentication. It includes database setup, authentication, and file upload features.

## Features
- User authentication (login, registration)
- Database setup and table creation
- Secure JWT authentication
- Multer file upload handling
- Express.js for handling API routes

## Project Structure
```
backend/
│── database/
│   ├── createTable.js    # Script to create database tables
│   ├── dbConfig.js       # Database configuration
│── helper/
│   ├── multer.js         # File upload handling
│── routes/
│   ├── authRoutes.js     # Authentication routes
│── controllers/
│   ├── authController.js # Authentication logic
│── middleware/
│   ├── authMiddleware.js # Token authentication middleware
│── server.js             # Main server file
│── package.json          # Project dependencies
```

## Installation
### 1. Clone the Repository
```sh
git clone https://github.com/hilla10/user-register.git
cd user-register/backend
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the `backend` directory and add the following:
```
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-jwt-secret-key
```

### 4. Set Up the Database
Run the script to create database tables:
```sh
node database/createTable.js
```

### 5. Start the Server
```sh
npm start
```
The backend server will run on `http://localhost:3000`

## API Endpoints
### Authentication
- `POST /register` - Register a new user
- `POST /login` - Log in a user and get a token
- `GET /profile` - Get user profile (Requires token)

### File Upload
- `POST /upload` - Upload an image (Requires token)

## License
This project is licensed under the MIT License.

---
**Contributors:**
- Your Name (@your-github-username)

# Project Name

## Overview
This project consists of a full-stack web application with a React.js frontend and a Node.js/Express.js backend using a MySQL database.

## Features
- User authentication (JWT-based)
- File upload with Multer
- Protected routes for authenticated users
- REST API for CRUD operations
- Database integration with MySQL

---

## Backend Setup

### Prerequisites
- Node.js (v16+ recommended)
- MySQL database

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the database:
   - Configure your MySQL connection in `database/dbConfig.js`
   - Create tables by running:
     ```sh
     node database/createTable.js
     ```
4. Start the server:
   ```sh
   npm start
   ```

### API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | /auth/login | Authenticate a user and return a token |
| POST   | /auth/register | Register a new user |
| GET    | /users | Get all users (requires authentication) |
| POST   | /upload | Upload an image file (requires authentication) |

---

## Frontend Setup

### Prerequisites
- Node.js (v16+ recommended)
- React.js with Vite

### Installation
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
