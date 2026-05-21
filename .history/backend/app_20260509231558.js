const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5000 });

const rooms = {};
const roomSessions = {}; // Track unique sessions for each room code

wss.on("connection", (ws) => {

  ws.on("message", (message) => {

    const data = JSON.parse(message);

    // JOIN ROOM
    if (data.type === "join") {

      ws.username = data.username;
      ws.room = data.room;
      ws.sessionId = data.sessionId;

      // Create unique room key combining code and session
      const roomKey = `${data.room}_${data.sessionId}`;

      if (!rooms[roomKey]) {
        rooms[roomKey] = [];
        roomSessions[data.room] = data.sessionId; // Track latest session for this code
      }

      rooms[roomKey].push(ws);

        // Broadcast updated user list to the room
        const users = rooms[roomKey].map((client) => client.username).filter(Boolean);
        rooms[roomKey].forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "userlist", users }));
          }
        });

      return;
    }

    // SEND MESSAGE
    if (data.type === "message") {

      const roomKey = `${data.room}_${data.sessionId}`;
      const roomUsers = rooms[roomKey];

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

console.log("Server running on port 5000");