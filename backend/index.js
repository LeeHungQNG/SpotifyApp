import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import { createServer } from 'http';

dotenv.config();

import userRoutes from './src/routes/user.route.js';
import adminRoutes from './src/routes/admin.route.js';
import authRoutes from './src/routes/auth.route.js';
import songRoutes from './src/routes/song.route.js';
import albumRoutes from './src/routes/album.route.js';
import statRoutes from './src/routes/stat.route.js';
import { connectDB } from './src/lib/db.js';
import fileUpload from 'express-fileupload';
import { initializeSocket } from './src/lib/socket.js';

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
); // config cors
app.use(express.json()); // to parse req.body
app.use(clerkMiddleware()); // this will add auth to req obj => req.auth
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp'),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
  })
);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statRoutes);

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: process.env.NODE_ENV === 'production' ? 'Internal sever error' : err.message });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ` + PORT);
  connectDB();
});
