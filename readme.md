# Task Manager Application

A full-stack Task Manager application built with:

- Frontend: React.js
- Backend: Express.js + Node.js
- Database: MongoDB

---

# Project Structure

```bash
project-root/
│
├── frontend/   # React frontend
├── backend/    # Express backend API
└── README.md
```

---

# Prerequisites

Make sure the following are installed on your system:

- Node.js (v18 or higher recommended)
- npm
- MongoDB

Verify installation:

```bash
node -v
npm -v
```

---

# Clone the Repository

```bash
git clone https://github.com/abdul9838/edtech-assignment.git
```

---

# Backend Setup

## 1. Navigate to backend folder

```bash
cd backend
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Create `.env` file

Inside the `backend` folder, create a `.env` file and add:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task-manager
NODE_ENV=development
JWT_SECRET=edtech_assignment_jwt_secret
```

---

## 4. Start MongoDB

Make sure MongoDB is running locally.

### Linux / macOS

```bash
sudo systemctl start mongod
```

### Windows

Start MongoDB service or open MongoDB Compass.

Verify MongoDB connection:

```bash
mongosh
```

---

## 5. Run the backend server

```bash
npm run dev
```

or

```bash
npm start
```

If everything is working correctly, you should see:

```bash
Server running on port 5000
MongoDB Connected
```

Backend will run at:

```bash
http://localhost:5000
```

---

# Frontend Setup

## 1. Open a new terminal

Go back to project root:

```bash
cd ..
```

---

## 2. Navigate to frontend folder

```bash
cd frontend
```

---

## 3. Install dependencies

```bash
npm install
```

---

## 4. Run the frontend

### Run this command on terminal

```bash
npm run dev
```

Frontend will run at:

```bash
http://localhost:5173
```

---

# Environment Variables

## Backend (`backend/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task-manager
NODE_ENV=development
JWT_SECRET=edtech_assignment_jwt_secret
```

# Available Scripts

## Backend

Run development server:

```bash
npm run dev
```

Run production server:

```bash
npm start
```

---

## Frontend

Start development server:

```bash
npm start
```

Create production build:

```bash
npm run build
```

---

# Common Issues

## MongoDB connection error

Ensure:

- MongoDB is installed
- MongoDB service is running
- `MONGODB_URI` is correct in env

---

## Dependency issues

Delete dependencies and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

# Tech Stack

## Frontend

- React.js
- Tailwind CSS
- React Hook Form
- React Hot Toast
- React Router DOM

## Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

# Author

Abdul Ahad
