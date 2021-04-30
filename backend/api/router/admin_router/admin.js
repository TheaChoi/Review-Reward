const express = require('express');
const router = express.Router();
const path = require('path');
const Review = require('../../models/Review');

// file upload
const multer = require('multer');
const _storage = multer.diskStorage
  ({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../', 'datas/'))
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

router.post('/upload', upload.array('files'), (req, res) => {
  console.log('hello upload router.');
  const title = req.body.title;
  const text = req.body.text;
  const star = req.body.star;

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

  Review.find({}).sort({_id:-1})
    .then(result => {
      // console.log("getList result", result);
      res.status(200).send(result) 
    })
    .catch(err => {
      console.log("getListerr", err);
      res.status(500).send(err)
    });
});

router.post('/deleteRows', (req, res) => {
  console.log("delete ids", req.body.ids);
  const id_arr = req.body.ids;
  Review.deleteMany({ _id: { $in: id_arr } })
  .then(result => {
      console.log("deleteRows result", result);
      res.status(200).send(result)  
  })
  .catch(err => {
    console.log("delete err", err);
    res.status(500).send(err)
  });
})

router.post('/deleteImage', (req, res) => {
  const row = req.body.row;
  const path = req.body.path;
  const new_files = [];

  const id = row._id;
  const files = row.files;
  files.forEach(file => {
    let p = (file.path).substring((file.path).lastIndexOf('\\')+1, (file.path).length)
    if ( p !== path ) {
      new_files.push(file)
    }
  });

  Review.updateOne({ _id: id }, { files: new_files })
  .then(result => {
      console.log("deleteImage result", result);
      res.status(200).send(result)  
  })
  .catch(err => {
    console.log("deleteImage err", err);
    res.status(500).send(err)
  });
})


router.get('/getSearched', (req, res) => {
  const criteria = req.query.criteria;
  const search = req.query.searched;
  console.log("criteria:", criteria)
  console.log("search:", search)
  if (criteria=='' && search=='') { 
    // console.log("empty")
    res.redirect('/admin/getList'); 
    return; 
  } else {
    const query = criteria == "username" 
    ? Review.find({ username: {'$regex': search, '$options': 'i' } }).sort({_id:-1}) 
    : Review.find({ numItem: { '$regex' : search, '$options' : 'i' } }).sort({_id:-1}) ;
    query.then(result => {
      console.log("getSearched result", result);
      res.status(200).send(result) 
    })
    .catch(err => {
      console.log("getSearched", err);
      res.status(500).send(err)
    });
  }
  
})

module.exports = router;