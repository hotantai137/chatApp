const express = require("express");
const router = express.Router();
var path = require('path');

router.route("/login").post((req, res, next) => {
  localStorage.setItem("user", req.body.username);
  return res.redirect('/index.html');
//   res.sendFile(path.join(__dirname + '/../public/index.html'));
});
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/login.html'));
});

module.exports = router;