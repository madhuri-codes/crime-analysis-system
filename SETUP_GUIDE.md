# Backend and Frontend Connection Setup Guide

## What I've Done

### 1. **Created API Service Layer** (`src/services/api.js`)
   - Centralized axios instance with base URL configuration
   - Automatic Bearer token injection for authenticated requests
   - Request/response interceptors for error handling
   - Pre-configured API endpoints for auth, user, and officer operations

### 2. **Updated Frontend Pages**
   - **LoginPage.jsx**: Now uses `authAPI.login()` instead of hardcoded axios
   - **SignupPage.jsx**: Now uses `authAPI.signup()` instead of hardcoded axios
   - Both pages now make requests to `/api/auth/login` and `/api/auth/register`

### 3. **Configured Vite Proxy** (`vite.config.js`)
   - Added development server proxy for `/api` routes
   - This routes API calls to `http://localhost:5000` during development
   - Helps avoid CORS issues in development

### 4. **Created Environment Configuration**
   - **Backend `.env`**: Configured with default values
   - **Backend `.env.example`**: Template for reference

---

## How to Run the Application

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Update `.env` file with your database credentials**:
   ```
   DB_HOST=localhost
   DB_USERNAME=root
   DB_PASSWORD=your_password
   DB_NAME=crime_analysis
   JWT_SECRET=your_secret_key
   ```

4. **Start the backend server**:
   ```bash
   npm run dev  # with nodemon for auto-reload
   # OR
   npm start    # single run
   ```
   
   The backend will run on: `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend/criminal_database
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The frontend will run on: `http://localhost:5173` (or another port shown in terminal)

---

## How the Connection Works

1. **During Development**:
   - Frontend requests to `/api/*` are proxied to `http://localhost:5000/api/*`
   - This is configured in `vite.config.js`
   - CORS headers are handled automatically by the Express backend

2. **Backend API Structure**:
   ```
   http://localhost:5000/api/auth/login       (POST)
   http://localhost:5000/api/auth/signup      (POST)
   http://localhost:5000/api/user/profile     (GET)
   http://localhost:5000/api/officers         (GET, POST, etc.)
   ```

3. **Frontend API Calls**:
   ```javascript
   // All API calls go through the centralized service
   import { authAPI, userAPI, officerAPI } from '../services/api'
   
   // Example usage
   await authAPI.login({ email, password })
   await authAPI.signup({ username, email, password, user_type })
   await userAPI.getProfile()
   await officerAPI.getOfficers()
   ```

---

## Database Setup

Make sure your MySQL database is set up:

1. **Create the database**:
   ```sql
   CREATE DATABASE crime_analysis;
   ```

2. **Run the database schema** (from `database.sql`):
   ```bash
   mysql -u root -p crime_analysis < database.sql
   ```

---

## Testing the Connection

1. **Start both servers** (as shown above)
2. **Open frontend** in browser: `http://localhost:5173`
3. **Try login** with test credentials
4. **Check browser console** (F12) for any errors
5. **Check backend console** for request logs

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Cannot POST /api/auth/login` | Make sure backend is running on port 5000 |
| `CORS error` | Backend CORS is enabled; make sure frontend uses `/api` paths |
| `401 Unauthorized` | Check if token is being saved in localStorage after login |
| `Cannot connect to database` | Verify `.env` file has correct DB credentials and MySQL is running |
| `Token not being sent` | Check `authAPI` interceptor in `src/services/api.js` |

---

## Next Steps

- Add more API endpoints to `src/services/api.js` as you build new features
- Create similar service files for other modules (criminals, suspects, etc.)
- For production, update the baseURL in `api.js` to use your deployment domain
- Add error boundaries and better error handling in components
