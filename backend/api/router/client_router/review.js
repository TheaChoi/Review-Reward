const express = require('express');
const router = express.Router();
const path = require('path');
const Review = require('../../models/Review');
// const RM = new ReviewModel();

// file upload
const multer = require('multer');
const _storage = multer.diskStorage
  ({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../../datas/'))
      // cb(null, "C:/Program Files (x86)/nginx/datas/")
      // cb(null, "C:/Program Files\ (x86)/nginx/datas/")
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  });
const upload = multer({ storage: _storage });

router.get('/', (req, res) => {
  console.log("hello...");
  res.send("hello...")
})
// router.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, ""))
// })

router.post('/upload', upload.array('files'), (req, res) => {
  console.log('hello upload router.');
  const title = req.body.title;
  const text = req.body.text;
  const star = req.body.star;
  const numItem = req.body.item;

  console.log("req.files : ", req.files);
  let files = [];
  if (req.files.length > 0) {
    for (let i = 0; i < req.files.length; i++) {
   let file = {
        "path": req.files[i].path,
        "name": req.files[i].originalname,
        "type": req.files[i].mimetype,
        "size": req.files[i].size
      }
      files.push(file);
    }
  }
  const data = {
    "title": title,
    "username": "GECL",
    "text": text,
    "star": star,
    "numItem": numItem,
    "files": files
  }
  console.log("data",data);
  
  Review.create(data)
    .then(result => {
      console.log("Review result", result);
      res.send("Review Uploaded!");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    });
  });

router.get('/getList', (req, res) => {
  console.log('hello getList router.');

  Review.find({}).sort( { "_id": -1 } )
    .then(result => {
      console.log(" getList result", result);
      res.send(result);
    })
    .catch(err => {
      console.log("getListerr", err);
      res.status(500).send(err)
    });
});

module.exports = router;