(function() {
    var  socket = io();
    $("form").submit(function(e) {
        let li = document.createElement("li");
        e.preventDefault(); // prevents page reloading
        socket.emit("chat message", $("#message").val());

        let user = window.localStorage.getItem("user");
        console.log(user);
        // let username = localStorage.setItem("user", req.body.username);
        let spanUser = document.createElement("span");
        spanUser.append('Tấn "MVP" Tài');
        // spanUser.append(username);
        spanUser.style.color = 'green';
        messages.appendChild(li).append(spanUser);
        messages.appendChild(li).append(document.createElement('br'));
        messages.appendChild(li).append($("#message").val());

        let messageView = document.querySelector("#messages");
        messageView.scrollTo(0, messageView.scrollHeight);
        // let span = document.createElement("span");
        // messages.appendChild(span).append("by " + "Anonymous" + ": " + "just now");
    
        $("#message").val("");
    
        return false;
      });
    
})();