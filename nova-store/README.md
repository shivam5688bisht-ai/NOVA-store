# NOVA Store — MERN E-Commerce (DevCamp 2.0 Task 3)

A learning project implementing the required full-stack e-commerce flow: product browsing, search/category filtering, product details, registration/login, bcrypt password hashing, JWT-protected APIs, cart, checkout, MongoDB orders, and order history.

## Requirements
- Node.js 20+ and npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## 1. Configure the backend
```bash
cd server
npm install
```
Copy `.env.example` to `.env` and set:
- `PORT`
- `MONGO_URI`
- `JWT_SECRET` (use a long random value; never commit this file)
- `CLIENT_URL`

## 2. Configure the frontend
```bash
cd ../client
npm install
```
Copy `client/.env.example` to `client/.env` if you need a non-default API URL. The default is `http://localhost:5000/api`.

## 3. Add sample products
From the `server` folder, after configuring `.env`:
```bash
npm run seed
```
This inserts sample products into the `products` collection. Running it again replaces the sample product collection.

## 4. Run the project
Open two terminals:

Terminal A:
```bash
cd server
npm run dev
```

Terminal B:
```bash
cd client
npm run dev
```
Open the local URL Vite prints (usually `http://localhost:5173`).

Alternatively, from the project root run `npm install` then `npm run install:all`, followed by `npm run dev`.

## API overview
- `POST /api/auth/register` — create account; password is hashed with bcrypt
- `POST /api/auth/login` — verify credentials and issue JWT
- `GET /api/auth/me` — protected current-user endpoint
- `GET /api/products` — list/search/filter products
- `GET /api/products/:id` — product details
- `POST /api/orders` — protected order creation
- `GET /api/orders/mine` — protected order history

## Important notes
- This is an educational assignment starter, not a production commerce system.
- Checkout records an order but does not process real payments.
- Cart state is stored in browser local storage; user and order records are stored in MongoDB.
- Add server-side rate limiting, stronger phone/postal validation, stock reservation, tests, and deployment configuration before treating it as production software.
- Do not commit `.env`, database credentials, or JWT secrets. README should list variable names only, never actual values.

## Suggested GitHub submission
Push the complete `nova-store` folder. Include this README, `.gitignore`, client and server source. Do not upload either `.env` file.
