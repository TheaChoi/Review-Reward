const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "No title",
    trim: true
  },
  username: {
    type: String,
    default: "TheaChoi"
  },
  text: {
    type: String,
    default: ""
  },
  star: {
    type: Number,
    default: 5
  },
  time: {
    type: Date,
    default: Date.now()
  },
  files: {
    type: Array
  },
  numItem: {
    type: String
  }
},
{ collection: 'Review' })

module.exports = mongoose.model('Review', ReviewSchema);