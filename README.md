# Notes App

This repository contains the source code for a simple Notes App built with Node.js and Express.

## Table of Contents

- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Authentication with Passport JWT](#authentication-with-passport-jwt)
- [Express Rate Limit and Throttle](#express-rate-limit-and-throttle)

## Database Schema

The application uses a PostgreSQL database. Please create your database and use the provided `database.sql` file to set up the required tables.

```bash
# Run the SQL commands in psql
psql -d notes_app -a -f database.sql
```

## Getting Started

```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
npm install
Replace your pg username and password in src/config/db.js
nodemon
```
The application should now be running on http://localhost:3000.

## Authentication with Passport JWT

Authentication is implemented using Passport.js with a JSON Web Token (JWT) strategy. To authenticate:

Register or log in to obtain a JWT.

Include the JWT in the Authorization header of your requests:

```bash
Authorization: Bearer <your-token>
```

## Express Rate Limit and Throttle

The application uses express-rate-limit and express-throttle middleware for rate limiting and throttling, respectively. These measures are applied to specific routes to prevent abuse and ensure fair usage.

### Rate Limiting
Rate limiting is applied to specific routes to control the number of requests per IP address in some period.

### Throttling
Throttling is applied to specific routes to control the rate of requests per IP address, allowing only a certain number of requests per second.
