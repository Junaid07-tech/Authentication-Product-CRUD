# Authentication & Product CRUD APIs

A full-stack e-commerce application built with Node.js, Express, MongoDB, and React.

This project includes JWT-based authentication with access and refresh tokens, secure authentication APIs, Product CRUD APIs, request validation using express-validator, and a React frontend.

## Features

- User registration and login
- JWT Access Token and Refresh Token authentication
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

### Frontend
- React
- React Router
- Axios
- React Hook Form
- Tailwind CSS

## API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Create a new user account |
| POST | `/api/auth/login` | Public | Login and get access token |
| POST | `/api/auth/refresh-token` | Public* | Generate a new access token |
| POST | `/api/auth/logout` | Authenticated | Logout and invalidate refresh token |
| GET | `/api/auth/me` | Authenticated | Get logged-in user profile |

### Products

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/products` | Authenticated | Create a product |
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get a single product |
| PUT | `/api/products/:id` | Authenticated | Update a product |
| DELETE | `/api/products/:id` | Authenticated | Delete a product |

## Project Setup

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd <project-folder>

```bash
git clone <your-github-repository-url>
cd <project-folder>