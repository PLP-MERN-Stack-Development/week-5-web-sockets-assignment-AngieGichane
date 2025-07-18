import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { 
    type: String, 
    required: true 
  },
  senderId: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  room: { 
    type: String, 
    default: 'global' 
  },
  isPrivate: { 
    type: Boolean, 
    default: false 
  },
  recipientId: { 
    type: String 
  },
  read: { 
    type: Boolean, 
    default: false 
  },
  reactions: { 
    type: Map, 
    of: String, 
    default: new Map() 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Message = mongoose.model('Message', messageSchema);
export default Message;