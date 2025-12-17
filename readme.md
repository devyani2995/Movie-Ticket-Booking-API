
# Movie Ticket Booking API 🎬🍿

**Movie Ticket Booking** is a small Node.js REST API for managing movies and bookings. It supports user registration/login (JWT), role-based access control (ADMIN/CUSTOMER), atomic bookings with promo codes, and uses MongoDB (Mongoose) for persistence.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Promo Types](#promo-types)
- [Notes & Implementation Details](#notes--implementation-details)
- [Contributing](#contributing)
- [License](#license)

---

## Features ✅

- User registration & login (JWT)
- Role-based access control (ADMIN / CUSTOMER)
- Admin: create movies, view all bookings
- Customers: book tickets with optional promo codes
- Atomic booking flow (MongoDB transactions)

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

### Example: Login & Book

1) Login

```bash
curl -X POST http://localhost:3000/auth/login \
	-H 'Content-Type: application/json' \
	-d '{"email":"user@example.com","password":"secret"}'
```

Response: `{ "token": "<JWT>" }`

2) Book tickets

```bash
curl -X POST http://localhost:3000/bookings \
	-H 'Content-Type: application/json' \
	-H 'Authorization: Bearer <JWT>' \
	-d '{"movieId":"<id>","seats":2,"promoCode":"SUMMER"}'
```

## Promo Types 🏷️

| Code Type   | Effect on amount |
|-------------|------------------|
| FREE_SEAT   | Reduces amount by 1 seat price (300) |
| FLAT_250    | Reduces amount by 250 |

Ticket price (current implementation) = 300 per seat. Promo adjustments are applied inside `src/services/booking.service.js`.

## Notes & Implementation Details 📝

- Booking is performed inside a MongoDB transaction to ensure consistency (seats decrement + booking create + user `totalSpent` update).
- Auth middleware expects header `Authorization: Bearer <token>` and verifies using `JWT_SECRET`.
- RBAC middleware enforces allowed roles for admin routes.
- Pay attention to `src/config/mongooseConfig.js` which reads `DB_URL_PROD` — change for local development if desired.

## Contributing 🤝

- Feel free to open issues or PRs. Suggested improvements:
	- Add validation & request schemas (Joi / express-validator)
	- Add unit/integration tests
	- Add request logging and better error handling

## License

MIT — feel free to use and adapt.

---

If you'd like, I can also add a sample `.env.example`, improve `package.json` scripts, or add basic tests — tell me which you'd like next. ✅

