// express 모듈
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const port = 4000;
// mongoDB 모듈
const mongoose = require('mongoose');
const client_router = require('./router/client_router/index');
const admin_router = require('./router/admin_router/index');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'datas')));
app.use('/api', client_router);
app.use('/admin', admin_router);

// mongodb connection
mongoose.connect('mongodb://mongo:27017/rr', { 
  useNewUrlParser: true
})
.then(() => console.log('Successfully connected to mongodb-----'))
.catch(e => console.error('mongo connect error', e));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
  