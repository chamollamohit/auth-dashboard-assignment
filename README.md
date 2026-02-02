# Auth & Task Management Dashboard

A full-stack authentication and task management dashboard built with Next.js, Prisma, and PostgreSQL. This application features secure user authentication, profile management, and a robust task tracking system.

## 🔗 Live Demo

**Check it out here:** [https://auth-dashboard-assignment-psi.vercel.app/](https://auth-dashboard-assignment-psi.vercel.app/)

## 🧪 Demo Credentials

Use these to test the dashboard immediately without signing up:

- **Email:** `admin@gmail.com`
- **Password:** `admin123`

---

## Features

- **User Authentication**: Secure signup, login, and logout functionality using JWT-based authentication.
- **Task Management**: Create, view, update, and delete tasks with statuses: `PENDING`, `IN_PROGRESS`, and `COMPLETED`.
- **Profile Management**: Users can view their profile information after authentication.
- **Responsive Dashboard**: A clean UI for managing personal tasks.
- **Dockerized Setup**: Easily spin up the environment using Docker and Docker Compose.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Lucide React, Sonner (Toasts)
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Security:** JWT Authentication (HttpOnly Cookies), Bcrypt Password Hashing
- **DevOps:** Docker

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- npm or yarn

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/chamollamohit/auth-dashboard-assignment
    cd auth-dashboard-assignment
    ```
2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Environment Variables:** Create a `.env` file in the root directory and add your configuration:

    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
    JWT_SECRET="your_secret_key"
    ```

4. **Initialize Database:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

### Running the Application

**Development Mode**
`bash
    npm run dev
    `

**Using Docker**
`bash
    docker-compose up --build
    `

## Project Structure

- `src/app:` Next.js pages and API routes.

- `(auth):` Login and Signup pages.

- `api/v1:` Backend endpoints for authentication and task CRUD operations.

- `dashboard:` Main protected dashboard view.

- `src/components:` UI components including TaskManager, LogoutButton, and ProfileSettings.

- `src/lib:` Core logic for auth, database connection (db.ts), and validation.

- `prisma/:` Database schema defining User and Task models.

## API Endpoints

- **Auth**
    - `POST /api/v1/auth/signup:` Register a new user.

    - `POST /api/v1/auth/login:` Authenticate and receive a session.

    - `POST /api/v1/auth/logout:` End the current session.

- **User**
    - `GET /api/v1/me:` Fetch current user details.
    - `PUT /api/v1/me:` Update user details.

* **Tasks**
    - `GET /api/v1/tasks:` Fetch all tasks for the logged-in user.

    - `POST /api/v1/tasks:` Create a new task.

    - `PATCH /api/v1/tasks/[id]:` Update a specific task.

    - `DELETE /api/v1/tasks/[id]:` Delete a specific task.

## 🛡️ Scalability & Production Readiness (Note)

To scale this for production, I would:

**Caching:** Implement Redis to cache user sessions and frequently accessed task lists.

**Database:** Add indexes to userId and createdAt columns in PostgreSQL to optimize query speeds.

**Security:** Transition to Auth.js for robust session management and add CSRF protection.

**Deployment:** Use a CDN (like Vercel Edge) for the frontend and a managed RDS for the database with connection pooling.
