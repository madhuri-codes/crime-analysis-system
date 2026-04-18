#  Crime Analysis System

A full-stack web application for managing criminal records and analyzing crime data. Built as a DBMS project using MySQL, Express.js, Node.js, and React.js.

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) |
| Backend | Node.js, Express.js |
| Database | MySQL |

---

##  Project Structure

```
crime-analysis-system/
├── frontend/       # React.js client
├── backend/        # Express.js server & API
├── .gitignore
└── README.md
```

---

##  Database Overview

The MySQL database consists of 17 tables covering:

- **Crimes** — type, location, date, status, damage estimate
- **People** — criminals, suspects, victims, officers
- **Evidence** — type, collection details, storage
- **Arrests** — charges, bail status, arresting officer
- **Criminal History** — verdicts, sentences, parole status
- **User Accounts** — officer-linked logins, access levels
- **Public Reports** — citizen-submitted crime reports with officer review

---

##  Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL (v8+)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/madhuri-codes/crime-analysis-system.git
cd crime-analysis-system
```

### 2. Set up the backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=crime_analysis_db
PORT=5000
```

Start the server:
```bash
node index.js
```

### 3. Set up the frontend
```bash
cd frontend
npm install
npm run dev
```

---

##  Team

| Name | GitHub |
|------|--------|
| Madhuri N | [@madhuri-codes](https://github.com/madhuri-codes) |
| Neha Kamath | [@NehaK-XP](https://github.com/NehaK-XP) |
| D Jahnavi | [@jaanuC600](https://github.com/jaanuC600) |
| Shanti | — |

---

##  Status

🚧 Under active development — DBMS course project.
