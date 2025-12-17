
# Movie Ticket Booking API 🎬🍿

**Movie Ticket Booking** is a small Node.js REST API for managing movies and bookings. It supports user registration/login (JWT), role-based access control (ADMIN/CUSTOMER), atomic bookings with promo codes, and uses MongoDB (Mongoose) for persistence.

---

## Features ✅

- User registration & login (JWT)
- Role-based access control (**Admin** and **Customer**)
- Movie management and ticket booking
- Promotion and discount handling
- **Concurrency-safe seat booking** using MongoDB transactions

## Tech Stack 🔧

- Node.js (ES Modules)
- Express
- MongoDB & Mongoose
- JWT for auth
- bcryptjs for password hashing
- dotenv for configuration

## Prerequisites ⚠️

- Node.js 18+ and npm
- Running MongoDB instance (local or cloud)

## Setup 💡

1. Clone the repo

```bash
git clone <repo-url>
cd Movie-Ticket-Booking
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file (see next section for vars)

4. Run the app (suggested scripts below)

```bash
# development (install nodemon globally or use npx)
nodemon server.js

# or
node server.js
```

## Environment Variables 🔐

Create a `.env` file in the project root with at least the following variables:

```
PORT=3000
JWT_SECRET=your_jwt_secret_here
DB_URL_PROD=mongodb://<user>:<pass>@host:port/dbname
```

## API Endpoints 📡

All endpoints are JSON-based. The app mounts routers at `/auth`, `/admin`, and `/bookings`.

- POST /auth/register
	- Body: `{ name, email, password, role }` (role optional: `ADMIN` or `CUSTOMER`)
	- Response: created user object (password is saved hashed)

- POST /auth/login
	- Body: `{ email, password }`
	- Response: `{ token }` (JWT, include it in `Authorization: Bearer <token>` header)

- POST /admin/movies (ADMIN only)
	- Headers: `Authorization: Bearer <token>`
	- Body: `{ title, totalSeats }`
	- Creates a movie. `availableSeats` is initially set to `totalSeats`.

- GET /admin/bookings (ADMIN only)
	- Headers: `Authorization: Bearer <token>`
	- Returns all bookings (populated `user` and `movie`)

- POST /bookings (authenticated users)
	- Headers: `Authorization: Bearer <token>`
	- Body: `{ movieId, seats, promoCode? }`
	- Successful response: `{ success: true, amount }`
	- Errors: Not enough seats, invalid promo, etc. Returned as `{ message }` with 400 status.

