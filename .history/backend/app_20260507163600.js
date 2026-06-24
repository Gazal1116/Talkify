const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8000 });

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

        // Broadcast updated user list to the room
        const users = rooms[data.room].map((client) => client.username).filter(Boolean);
        rooms[data.room].forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "userlist", users }));
          }
        });

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

      // Broadcast updated user list after someone leaves
      if (rooms[ws.room] && rooms[ws.room].length > 0) {
        const users = rooms[ws.room].map((client) => client.username).filter(Boolean);
        rooms[ws.room].forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "userlist", users }));
          }
        });
      }

    }

  });

});

console.log("Server running on port 8000");