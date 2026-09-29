# Authentication & Product CRUD APIs

A full-stack e-commerce application built with Node.js, Express, MongoDB, and React.

This project provides JWT-based authentication, secure authentication APIs, Product CRUD APIs, request validation using express-validator, and a React frontend for authentication and product management.

## Features

- User registration and login
- JWT access token and refresh token authentication
- Automatic access token refresh
- Secure logout with refresh token invalidation
- Get logged-in user profile
- Product Create, Read, Update and Delete
- Protected product write routes
- Request validation using express-validator
- React frontend for authentication and product management

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- express-validator
- cookie-parser
- CORS

### Frontend

- React
- React Router
- Axios
- React Hook Form
- Tailwind CSS
- Vite

## API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Create a new user account |
| POST | `/api/auth/login` | Public | Login and get access token |
| POST | `/api/auth/refresh-token` | Public* | Generate a new access token |
| POST | `/api/auth/logout` | Authenticated | Logout and invalidate refresh token |
| GET | `/api/auth/me` | Authenticated | Get logged-in user profile |

\* Requires a valid refresh token.

### Products

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/products` | Authenticated | Create a product |
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get a single product |
| PUT | `/api/products/:id` | Authenticated | Update a product |
| DELETE | `/api/products/:id` | Authenticated | Delete a product |

## Project Structure

```text
Authentication-Product-CRUD/
│
├── backend/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Junaid07-tech/Authentication-Product-CRUD.git
cd Authentication-Product-CRUD
```

### 2. Backend Setup

Open a terminal in the project root and run:

```bash
cd backend
npm install
npm run dev
```

The backend will run on the configured port.

### 3. Frontend Setup

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start using Vite.

## Environment Variables

Create a `.env` file inside the `backend` folder and add your required MongoDB and JWT configuration.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Do not commit the `.env` file to GitHub.

## Authentication Flow

The application uses:

- Access token for authenticated API requests
- Refresh token stored in an HTTP-only cookie
- Automatic access token refresh when the access token expires
- Refresh token invalidation during logout

## Validation

The backend uses `express-validator` to validate authentication and product requests.

Invalid requests return a `400` status code with validation error details.

## Live Project

Frontend:

https://authentication-product-crud-kctd.vercel.app/

Backend:

https://authentication-product-crud-amber.vercel.app/

## GitHub Repository

https://github.com/Junaid07-tech/Authentication-Product-CRUD

## Author

Junaid Ansari