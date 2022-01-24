const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
// const connectdb = require("./../dbconnect");
// const Chats = require("./../models/Chat");

const router = express.Router();

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
//session middleware

var session;
router.route("/").get((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  session=req.session;
  var user = req.query.user;
  console.log(user);
  console.log(session);
    // if(session.userid){
    //     res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    // }else
    // res.sendFile('index.html',{root:__dirname})

  

//   connectdb.then(db => {
//     let data = Chats.find({ message: "Anonymous" });
//     Chats.find({}).then(chat => {
//       res.json(chat);
//     });
//   });
});

module.exports = router;