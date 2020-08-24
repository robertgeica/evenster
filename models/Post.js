const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: {
    type: Object,
    required: true
  },

  image: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  content: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = Post = mongoose.model('post', PostSchema);