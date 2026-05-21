const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5000 });

const rooms = {};

wss.on("connection", (ws) => {

  ws.on("message", (message) => {

    const data = JSON.parse(message);

    // JOIN ROOM
    if (data.type === "join") {

      ws.username = data.username;
      ws.room = data.room;

      if (!rooms[data.room]) {
        rooms[data.room] = [];
      }

      rooms[data.room].push(ws);

      return;
    }

    // SEND MESSAGE
    if (data.type === "message") {

      const roomUsers = rooms[data.room];

      if (!roomUsers) return;

      roomUsers.forEach((client) => {

        if (client.readyState === WebSocket.OPEN) {

          client.send(
            JSON.stringify({
              username: data.username,
              text: data.text,
            })
          );

        }

      });

    }

  });

  // disconnect
  ws.on("close", () => {

    if (ws.room && rooms[ws.room]) {

      rooms[ws.room] = rooms[ws.room].filter(
        (client) => client !== ws
      );

    }

  });

});

console.log("Server running on port 5000");