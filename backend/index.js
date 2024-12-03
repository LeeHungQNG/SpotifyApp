import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import userRoutes from './src/routes/user.route.js';
import adminRoutes from './src/routes/admin.route.js';
import authRoutes from './src/routes/auth.route.js';
import songRoutes from './src/routes/song.route.js';
import albumRoutes from './src/routes/album.route.js';
import statRoutes from './src/routes/stat.route.js';
import { connectDB } from './src/lib/db.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // to parse req.body

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ` + PORT);
  connectDB();
});
