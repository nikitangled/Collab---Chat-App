const socket = io("http://localhost:8000");

const form = document.getElementById('send-container');
const msgInp = document.getElementById("msg");
const msgContainer = document.querySelector(".container");

var audio = new Audio("sound.mp3");
const append = (msg, pos) => {
    const msgelement = document.createElement("div");
    msgelement.innerText = msg;
    msgelement.classList.add("message");
    msgelement.classList.add(pos);
    msgContainer.append(msgelement);
    if (pos == 'left') {
        audio.play();
    }
}
const user = prompt("Enter your name to join");
socket.emit('new-user-joined', user);

socket.on("user-joined", user => {
    append(`${user} joined the chat`, "left");
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = msgInp.value;
    console.log(msg);
    append(`You: ${msg}`, 'right');
    socket.emit("send", msg);
    msgInp.value = "";
})
socket.on("receive", data => {
    append(`${data.name}: ${data.message}`, 'left')
})
socket.on("left", user => {
    append(`${user} left the chat`, 'left');
})

