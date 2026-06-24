# Product Browser

A scalable product browsing application built with the MERN stack.

## Features

- Cursor-based pagination
- Category filtering
- Handles 200,000+ products efficiently
- MongoDB compound indexes
- Fast queries using lean()
- React frontend
- Express backend
- MongoDB Atlas database

---

## Tech Stack

### Frontend
- React
- Vite
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Project Structure

```text
Product/
│
├── backend/
│   ├── package.json
│   ├── server.js
│   └── ...
│
└── frontend/
    ├── package.json
    ├── src/
    └── ...
```


## API Endpoints

### Get Products

GET /api/products

### Filter by Category

GET /api/products?category=Books

### Pagination

GET /api/products?cursorUpdatedAt=...&cursorId=...



## Why Cursor Pagination?

Offset pagination (skip/limit) can lead to duplicate or missing records when data changes.

This project uses cursor pagination based on:

- updatedAt
- _id

This ensures stable pagination even when products are added or updated while users are browsing.



## Database Indexes

Indexes used:

1. { updatedAt: -1, _id: -1 }

2. { category: 1, updatedAt: -1, _id: -1 }

These indexes allow efficient sorting, filtering, and pagination across 200,000 products.



## Architecture

Frontend
React + Axios

Backend
Node.js + Express

Database
MongoDB Atlas

Deployment
Frontend: Vercel
Backend: Render



## Live Demo

Frontend:
products-taupe-nine.vercel.app

Backend:
https://product-browser-api-cgra.onrender.com



## Generate 200,000 Products

npm run seed



## Performance Optimizations

- Cursor Pagination
- Compound Indexes
- lean() Queries
- Field Projection
- Bulk Insert Seeding


## UI

### Product list

<img width="1072" height="837" alt="image" src="https://github.com/user-attachments/assets/471fb892-6374-4071-8d2e-6227f7ff51be" />

### Category dropdown

<img width="1110" height="552" alt="image" src="https://github.com/user-attachments/assets/237d6084-c413-40db-a6e5-f513eda4f992" />

### Load More button and Total loaded products 

<img width="915" height="547" alt="image" src="https://github.com/user-attachments/assets/ab4da473-2c4f-4506-9613-56a5b03f8083" />



