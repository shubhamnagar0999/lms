# LMS Module Backend

**Express + Prisma + PostgreSQL + Docker**

A simplified Learning Management System (LMS) backend.

Includes: - RBAC (ADMIN / STUDENT) - Course & Lesson Management -
Student Enrollment - Video Progress Tracking (Resume + Completion Logic) - Dockerized setup for one-command execution

------------------------------------------------------------------------

## Tech Stack

-   Node.js + Express (TypeScript)
-   Prisma ORM
-   PostgreSQL
-   JWT Authentication
-   Role-Based Access Control (RBAC)
-   Docker + Docker Compose
-   Simple HTML demo pages

------------------------------------------------------------------------

## Features

###  Admin

-   Login
-   Create students
-   Create / Update / Delete courses
-   Create / Update / Delete lessons
-   Enroll student into multiple courses

### Student

-   Login
-   View enrolled courses with lessons
-   Track video progress:
    -   Save timestamp
    -   Save watched percentage
    -   Resume from last saved time
    -   Auto mark complete at **90% watched**
-   Get lesson-specific progress
-   Get course-level completion summary

------------------------------------------------------------------------

## Quick Start (Docker)

### Clone Code
``` bash
git clone https://github.com/shubhamnagar0999/lms.git
```

### Configure Environment Variables

Create `.env` file:

``` env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lms_db"
JWT_SECRET="your_secret"
PORT=5000
```

### Run Everything

``` bash

docker-compose up --build
```

This will: - Start PostgreSQL - Run Prisma migrations - Seed demo data
(admin, student, courses, lessons, enrollment) - Start backend server

------------------------------------------------------------------------

## Seeded Demo Credentials

### Admin

Email: admin@test.com\
Password: admin123

### Student

Email: student@test.com\
Password: student123

------------------------------------------------------------------------

### Open Demo Pages For Student Video Progress Test

Student Login: http://localhost:5000/student-login.html

Student Player: http://localhost:5000/student-player.html

------------------------------------------------------------------------

## Reset Database

``` bash
docker-compose down -v
docker-compose up --build
```


## Local Setup (Without Docker)

### Install Dependencies

``` bash
npm install
```


### Run Migrations & Seed

``` bash
npx prisma migrate dev
npx prisma db seed
```

### Start Server

``` bash
npm run dev
```

------------------------------------------------------------------------

## API documentation & ER Diagram 
Available in docs folder


