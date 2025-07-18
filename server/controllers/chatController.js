import Message from '../models/Message.js';

export const saveMessage = async (messageData) => {
  try {
    const message = new Message({
      sender: messageData.sender,
      senderId: messageData.senderId,
      message: messageData.message,
      timestamp: messageData.timestamp,
      room: messageData.room,
      isPrivate: messageData.isPrivate || false,
      recipientId: messageData.recipientId,
      read: messageData.read || false
    });
    return await message.save();
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

export const getMessages = async (room = 'global', limit = 50) => {
  try {
    return await Message.find({ room })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .exec();
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const getPrivateMessages = async (userId1, userId2, limit = 50) => {
  try {
    return await Message.find({
      $or: [
        { senderId: userId1, recipientId: userId2 },
        { senderId: userId2, recipientId: userId1 }
      ],
      isPrivate: true
    })
    .sort({ createdAt: 1 })
    .limit(limit)
    .lean()
    .exec();
  } catch (error) {
    console.error('Error fetching private messages:', error);
    throw error;
  }
};

export const markMessagesAsRead = async (senderId, recipientId) => {
  try {
    return await Message.updateMany(
      {
        senderId,
        recipientId,
        read: false
      },
      {
        $set: { read: true }
      }
    );
  } catch (error) {
    console.error('Error marking messages as read:', error);
    throw error;
  }
};