const { query } = require("express");
const express = require("express");
const router = express.Router();
var path = require('path');
const store = require("store2");
const cookieParser = require("cookie-parser");
  const sessions = require('express-session');

router.route("/").post((req, res, next) => {
  // store('user', {name: 'Adam', age: 27, salary: 3452}); 
  // console.log(store('user'));
  let user = req.body.username;
  var session=req.session;
  session.username = user;
  
  return res.redirect('./chats');
//   res.sendFile(path.join(__dirname + '/../public/index.html'));
});
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/login.html'));
});

module.exports = router;