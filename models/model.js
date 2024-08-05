
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yogi27601:Rahul@27601@cluster1.xzy4bgd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
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
