const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:10000/1000");

ws.on("open", function open() {
  ws.send("something");
});

function heartbeat() {
  this.isAlive = true;
}

function ping() {
  console.log(ws);
  ws.ping(".", false);
}

ws.on("connection", function connection(ws) {
  ws.isAlive = true;
  ws.on("pong", heartbeat);

  setInterval(ping(), 1000);
});

ws.on("message", function incoming(data) {
  console.log(data);
});

ws.on("close", function close() {
  console.log("server close");
});

ws.on("disconnect", function(d) {
  console.log("Disconnected");
});
