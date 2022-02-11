var  socket = io();
var userTypes = [];
(function() {
  setEvents();
    function setEvents(){
      let messageInput = $("#message");
      messageInput.keypress(function(e){
        console.log(e.key + ' ' + e.keyCode);
        console.log($("#message").val());
        let username = $.cookie("username");
        
        if(e.keyCode === 13){
          socket.emit("stopTyping", { username: username });
        }else{
          socket.emit("typing", { username: username });
        }
      });

      // messageInput.key(function(e){
      //   if(!$("#message").val()){
      //     let username = $.cookie("username");
      //     socket.emit("typing", { username: username });
      //   }        
      // });
    }
    function addMessage(username, message){
      let bubbleHTML = `<div class="bubble is-in can-have-tail is-group-last" 
      data-mid="7508066303" 
      data-peer-id="-1752879275" 
      data-timestamp="1644556756">
      <div class="bubble-content-wrapper">
        <div class="bubble-content">
          <div class="message" dir="auto">${message}
            <span class="time tgico">
              <span class="i18n">12:19 PM</span>
              <div class="inner tgico" title="11 February 2022, 12:19:16">
                <span class="i18n">12:19 PM</span>
              </div>
            </span>
          </div>
          <div data-peer-id="1840063102" class="name" style="color: rgb(15, 178, 151);">
            <span class="peer-title" dir="auto" data-peer-id="1840063102">${username}
            </span>
          </div>
          <svg viewBox="0 0 11 20" width="11" height="20" class="bubble-tail"><use href="#message-tail-filled">
          <svg id="message-tail-filled" viewBox="0 0 11 20"><g transform="translate(9 -14)" fill="inherit" fill-rule="evenodd"><path d="M-6 16h6v17c-.193-2.84-.876-5.767-2.05-8.782-.904-2.325-2.446-4.485-4.625-6.48A1 1 0 01-6 16z" transform="matrix(1 0 0 -1 0 49)" id="corner-fill" fill="inherit"></path></g></svg></use></svg>
        </div>
        <avatar-element class="user-avatar avatar-40 avatar-relative" peer="1840063102" data-color="">
          <img class="avatar-photo" src="data:image/png;base64,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">
        </avatar-element>
      </div>
      </div>`;

      var messages = document.getElementById("messages");
      messages.insertAdjacentHTML('beforeend', bubbleHTML);
      let messageView = document.querySelector("#messages");
      messageView.scrollTo(0, messageView.scrollHeight);
    }
    function changeUserTyping(){
      if(userTypes.length === 0){
        $('#typing').text('');
        return;
      }

      if(userTypes.length === 1){
        $('#typing').text(userTypes[0] + ' is typing...');
      }else{
        $('#typing').text(userTypes.length + ' people are typing...');
      }
    }
    $("form").submit(function(e) {
      e.preventDefault(); // prevents page reloading
      let username = $.cookie("username");
      let messageStr = $("#message").val();
      if(!messageStr || !username) return;

      socket.emit("chat message", {userName: username, msg: $("#message").val()});
      // let li = document.createElement("li");
      // let spanUser = document.createElement("span");
      // spanUser.append(username);
      // spanUser.style.color = 'green';
      // messages.appendChild(li).append(spanUser);
      // messages.appendChild(li).append(document.createElement('br'));
      // messages.appendChild(li).append($("#message").val());
      addMessage(username, messageStr);

      // let span = document.createElement("span");
      // messages.appendChild(span).append("by " + "Anonymous" + ": " + "just now");
    
      $("#message").val("");
      console.log($.cookie('geeksforgeeks'));
    
      return false;
    });
    socket.on("received", data  =>  {
      addMessage(data.userName, data.msg);      
    });
    socket.on("notifyTyping", data => {
      if(userTypes.indexOf(data.username) < 0) userTypes.push(data.username);
      
      changeUserTyping();
      // var messages = document.getElementById("messages");
      // let li = document.createElement("li");
      // let spanUser = document.createElement("span");
      // spanUser.append(data.username + ' is typing...');
      // messages.appendChild(li).append(spanUser);
    });
    socket.on("notifyStopTyping", (data) =>  {
      let index = userTypes.indexOf(data.username);
      if(index > -1) userTypes.splice(index, 1);
      changeUserTyping();
    });
})()