import { Router } from 'express';
import { protectRoute } from '../middleware/auth.middleware';

const router = Router();

router.get('/like', (req, res) => {
  req.auth.userId;
  res.send('User route with Get Method');
});

export default router;
