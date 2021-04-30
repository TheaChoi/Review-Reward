const express = require('express');
const Account = require('../../models/Account');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

const router = express.Router();
router.use(express.json());

let store =  new MongoStore({
  url: "mongodb://mongo:27017/rr",
  collection: "sessions"
});
// Catch errors
store.on('error', function(error) {
  console.log("<mongo store> ",error);
});
/* use session */
router.use(session({
  secret: 'geclkorea1$1$234',
  resave: false,
  saveUninitialized: true,
  store: store
}));


// https://velopert.com/1921 참조

/*
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "username": "test", "password": "test" }
*/
router.post('/signup', (req, res) => {
  console.log(req.body.username)
    // CHECK USER EXISTANCE
    Account.findOne({ username: req.body.username }, (err, exists) => {
        if (err) throw err;
        if(exists){
            return res.status(409).json({
                error: "USERNAME EXISTS",
                code: 3
            });
        }

        // CREATE ACCOUNT
        let account = new Account({
            username: req.body.username,
            password: req.body.password
        });

        account.password = account.generateHash(account.password);

        // SAVE IN THE DATABASE
        account.save( err => {
            if(err) throw err;
            return res.json({ success: true });
        });

    });
});


router.post('/signin', (req, res) => {

  if(typeof req.body.password !== "string") {
      return res.status(401).json({
          error: "LOGIN FAILED",
          code: 1
      });
  }

  // FIND THE USER BY USERNAME
  Account.findOne({ username: req.body.username}, (err, account) => {
      if(err) throw err;

      // CHECK ACCOUNT EXISTANCY
      if(!account) {
          return res.status(401).json({
              error: "LOGIN FAILED_NO_ACCOUNT",
              code: 1
          });
      }

      // CHECK WHETHER THE PASSWORD IS VALID
      if(!account.validateHash(req.body.password)) {
          return res.status(401).json({
              error: "LOGIN FAILED_PASSWORD",
              code: 1
          });
      }
    
      // ALTER SESSION
      let session = req.session;
      
      session.loginInfo = {
          _id: account._id,
          username: account.username
      };

      console.log("session : ", session)
      // RETURN SUCCESS
      return res.json({
        loginInfo: session.loginInfo
          // user:"success"
      });
  });
});
/*
    세션확인 구현: GET CURRENT USER INFO GET /api/account/getInfo
*/
router.get('/getinfo', (req, res) => {
  if(typeof req.session.loginInfo === "undefined") {
      return res.status(401).json({
          error: 1
      });
  }
  res.json({ info: req.session.loginInfo });
});

router.post('/signout', (req, res) => {
  req.session.destroy(err => { if(err) throw err; });
  return res.json({ success: true });
});

module.exports = router;
