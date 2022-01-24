//Require the express moule
const express = require('express');

//create a new express application
const app = express()

//require the http module
const http = require('http').Server(app)

// require the socket.io module
const io = require('socket.io');

const port = 3000;

const socket = io(http);
const chatRouter = require("./route/chatRoute");
const loginRouter = require("./route/loginRoute");
// app.use(bodyParser.json());

//routes
app.use("/chats", chatRouter);
app.use("/login", loginRouter);

//set the express.static middleware
app.use(express.static(__dirname + "/public"));

//create an event listener
//To listen to messages
socket.on('connection', (socket)=>{
    console.log('user connected');
});

//wire up the server to listen to our port 500
http.listen(port, ()=>{
    console.log('connected to port: '+ port)
});

socket.on("chat message", function(msg) {
    console.log("message: "  +  msg);
    //broadcast message to everyone in port:5000 except yourself.
    socket.broadcast.emit("received", { message: msg  });
});