# Investment Platform

This repository contains a full‑stack investment platform built with **Laravel 10** (PHP 8.2+) for the backend and **React (Vite) with TypeScript** for the frontend.  It connects **investors** with **small business owners** seeking funding.  Investors can review applications and approve or reject them; business owners can submit applications and track their status; and an optional admin can monitor everything.

## Features

### Backend (Laravel 10)

* **JWT Authentication** – Stateless authentication using the [`php‑open‑source‑saver/jwt‑auth` package](https://laravel-jwt-auth.readthedocs.io/en/stable/laravel-installation/).  The package is pulled in via Composer and configured so that the `api` guard uses the `jwt` driver【313930729593408†L23-L63】【163564038154287†L279-L335】.
* **Role‑based access** – Users have a `role` attribute (`admin`, `investor` or `business_owner`).  Controllers check roles to determine what actions are allowed.
* **Business applications** – Business owners can submit funding applications with details such as business name, category, revenue, profit, funding amount and an optional pitch deck (PDF).  Investors and admins can view all applications; business owners only see their own.
* **Investment tracking** – When an investor approves an application the system creates an `investment` record.  Investors can view their investments along with amount, date, status and returns.
* **JSON Resources** – API responses are transformed using Laravel resource classes for a clean and consistent JSON API.
* **Seed data** – A database seeder creates one admin, two investors, two business owners and three example applications for quick testing.

### Frontend (React + Vite)

* **TypeScript & TailwindCSS** – Provides a modern developer experience with strong typing and utility‑first styling.
* **React Router v6** – Handles client‑side routing with protected routes that redirect unauthenticated users.
* **Context API** – Global authentication state (user and JWT token) is managed via a context provider.  Tokens are stored in `localStorage`.
* **Axios** – Configured with an interceptor that automatically attaches the JWT token to API requests.
* **Pages** – Includes a Home page, Login/Registration forms, dashboards for investors and business owners, an application submission form, an investment tracking page and a profile page.

## Folder structure

```txt
project/
├── backend/      # Laravel 10 API
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/
│   ├── routes/
│   ├── …
│   └── composer.json
├── frontend/     # React + Vite
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── api/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── tailwind.config.js
│   └── vite.config.ts
└── README.md
```

## Requirements

* PHP ≥ 8.1 with the `pdo_sqlite` or `pdo_mysql` extension.
* Composer (for backend dependencies).
* Node.js ≥ 18 and npm (for frontend).  The project uses Vite, React and TailwindCSS.

## Setup Instructions

### Backend (Laravel)

1. **Install dependencies**

   ```sh
   cd project/backend
   composer install
   ```

2. **Create your environment file**

   Copy the example environment and generate an application key:

   ```sh
   cp .env.example .env
   php artisan key:generate
   ```

3. **Configure the database**

   For a quick local setup you can use SQLite.  Uncomment or add the following lines in your `.env` file and comment out the MySQL configuration:

   ```env
   DB_CONNECTION=sqlite
   DB_DATABASE=database/database.sqlite
   ```

   Then create the SQLite file:

   ```sh
   touch database/database.sqlite
   ```

   Alternatively you can configure MySQL by setting `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME` and `DB_PASSWORD`.

4. **Generate the JWT secret**

   Publish the package configuration (optional since a sensible default is provided) and generate a secret.  This command writes a `JWT_SECRET` value to your `.env` file【313930729593408†L23-L63】【163564038154287†L251-L270】.

   ```sh
   php artisan jwt:secret
   ```

5. **Run migrations and seeders**

   ```sh
   php artisan migrate --seed
   ```

6. **Start the API server**

   ```sh
   php artisan serve
   ```

   The API will be available at `http://localhost:8000`.  All endpoints are prefixed with `/api` (e.g. `POST /api/login`).

### Frontend (React)

1. **Install dependencies**

   ```sh
   cd project/frontend
   npm install
   ```

2. **Run the development server**

   ```sh
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.  During development, API calls to `/api/...` are proxied to `http://localhost:8000` as configured in `vite.config.ts`.

### Default credentials

After running the seeders you can log in with the following accounts:

| Role          | Email                   | Password |
|---------------|-------------------------|---------|
| **Admin**     | `admin@example.com`     | `password` |
| **Investor**  | `investor1@example.com` | `password` |
| **Investor**  | `investor2@example.com` | `password` |
| **Owner**     | `owner1@example.com`    | `password` |
| **Owner**     | `owner2@example.com`    | `password` |

## API Endpoints

| Method | Endpoint                                | Description |
|-------:|-----------------------------------------|-------------|
| `POST` | `/api/register`                          | Register a new user (investor or business owner) |
| `POST` | `/api/login`                             | Authenticate and receive a JWT token |
| `POST` | `/api/logout`                            | Invalidate the current token |
| `POST` | `/api/refresh`                           | Refresh an expired token |
| `GET`  | `/api/user`                              | Get the authenticated user’s profile |
| `GET`  | `/api/applications`                      | List applications (investors/admin see all; owners see theirs) |
| `POST` | `/api/applications`                      | Submit a new application (business owners only) |
| `GET`  | `/api/applications/{id}`                 | View a single application |
| `PUT`  | `/api/applications/{id}/approve`         | Approve an application (investors/admin only) |
| `PUT`  | `/api/applications/{id}/reject`          | Reject an application (investors/admin only) |
| `GET`  | `/api/investments`                       | List investments (investors see their own; admins see all) |

## Notes

* When approving an application the full funding amount is automatically recorded as an investment for the investor performing the action.  If you wish to implement partial investments or a more complex funding workflow you can extend the `ApplicationController` and `InvestmentController` accordingly.
* The JWT configuration can be customised via `config/jwt.php`.  The default time‑to‑live (`ttl`) is 60 minutes but you can override this by setting a `JWT_TTL` value in your `.env` file.
* CORS is configured to allow any origin by default (`config/cors.php`) so that the React frontend can communicate with the Laravel API during local development.

## License

This project is licensed under the MIT License.