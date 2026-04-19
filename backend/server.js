import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// routes
import authRoutes from './routes/authRoutes.js';

// middleware
import { authMiddleware, authoriseRoles } from './middleware/authMiddleware.js';

// routes
// import criminalRoutes from './routes/criminals.js';
// import suspectRoutes from './routes/suspects.js';
// import victimRoutes from './routes/victims.js';
// import arrestRoutes from './routes/arrests.js';
// import reportRoutes from './routes/reportRoutes.js';


import userRoutes from './routes/userRoutes.js';
import officerRoutes from './routes/officerRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import criminalRoutes from './routes/criminalRoutes.js';
import crimeRoutes from './routes/crimeRoutes.js';
import arrestRoutes from './routes/arrestRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/officers', officerRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/criminals', criminalRoutes);
app.use('/api/crimes', crimeRoutes);
app.use('/api/arrests', arrestRoutes);
app.use('/api/auth', authRoutes);
// app.use('/api/suspects', suspectRoutes);
// app.use('/api/victims', victimRoutes);
// app.use('/api/arrests', arrestRoutes);
// app.use('/api/reports', reportRoutes);

// test route
app.get('/', (req, res) => {
  res.json({ message: `Server is running!`});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
