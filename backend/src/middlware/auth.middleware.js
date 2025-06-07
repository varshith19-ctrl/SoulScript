import jwt from 'jsonwebtoken';
import User from '../model/User.model.js';
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export const verifyToken=async(req, res, next)=> {
  const token = req.cookies.token;

    if (!token) return res.status(403).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
