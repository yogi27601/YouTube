const express = require('express');

const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const{Video}=require("./models/model")

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname,'build')))


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


app.post('/api/videos', upload.fields([{ name: 'src' }, { name: 'logo' }]), async (req, res) => {
  const { h3, p } = req.body;
  const { src, logo } = req.files;

  if (!src || !logo || !h3 || !p) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newVideo = new Video({
      src: src[0].filename,
      logo: logo[0].filename,
      h3,
      p,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get('*',(req,res)=>(
  res.sendFile(path.join(__dirname,'build','index.html'))
))


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
