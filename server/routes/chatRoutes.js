import express from 'express';
import { getMessages, getPrivateMessages } from '../controllers/chatController.js';

const router = express.Router();

router.get('/messages', async (req, res) => {
  try {
    const messages = await getMessages(req.query.room);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.get('/messages/private', async (req, res) => {
  try {
    const { user1, user2 } = req.query;
    if (!user1 || !user2) {
      return res.status(400).json({ error: 'Both user IDs are required' });
    }
    const messages = await getPrivateMessages(user1, user2);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch private messages' });
  }
});

export default router;