//Require the express moule
const express = require('express');

//create a new express application
const app = express();

//require the http module
const http = require('http').Server(app)
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

// require the socket.io module
const io = require('socket.io');;
var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

const port = 3000;
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

const socket = io(http);
const chatRouter = require("./route/chatRoute");
const loginRouter = require("./route/loginRoute");
// app.use(bodyParser.json());

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
  }));

//routes
app.use("/chats", chatRouter);
app.use("/login", loginRouter);

//set the express.static middleware
app.use(express.static(__dirname + "/public"));

//create an event listener
//To listen to messages
socket.on('connection', (socket)=>{
    console.log('user connected');
    // socket.broadcast.emit("received", { message: 'ssssss'  });
    socket.on("disconnect", function() {
      console.log("user disconnected");
    });
    socket.on("chat message", function(data) {
      //broadcast message to everyone in port:5000 except yourself.
      socket.broadcast.emit("received", data);
    });
    //Someone is typing
    socket.on("typing", data => { 
      socket.broadcast.emit("notifyTyping", { username: data.username });
    });
    //when soemone stops typing
    socket.on("stopTyping", (data) => { socket.broadcast.emit("notifyStopTyping", { username: data.username }); });
});

//wire up the server to listen to our port 500
http.listen(port, ()=>{
    console.log('connected to port: '+ port)
});