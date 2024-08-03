
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/videoDB', {

}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define a Video Schema
const videoSchema = new mongoose.Schema({
  src: String,
  logo: String,
  h3: String,
  p: String,
});

const Video = mongoose.model('Video', videoSchema);
module.exports={Video}