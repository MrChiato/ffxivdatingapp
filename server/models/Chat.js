const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

chatSchema.virtual('latestMessage').get(function () {
  if (this.messages.length > 0) {
    return this.messages[this.messages.length - 1].text;
  }
  return '';
});

module.exports = mongoose.model('Chat', chatSchema);