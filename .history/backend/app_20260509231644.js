const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8000 });

const rooms = {};
const roomSessions = {}; // Track unique sessions for each room code

wss.on("connection", (ws) => {

  ws.on("message", (message) => {

    const data = JSON.parse(message);

    // JOIN ROOM
    if (data.type === "join") {

      ws.username = data.username;
      ws.room = data.room;
      
      // Use provided sessionId or get the latest active session for this room
      let sessionId = data.sessionId || roomSessions[data.room];
      
      // If no session exists for this room yet, create a new one
      if (!sessionId) {
        sessionId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        roomSessions[data.room] = sessionId;
      }
      
      ws.sessionId = sessionId;

      // Create unique room key combining code and session
      const roomKey = `${data.room}_${sessionId}`;

      if (!rooms[roomKey]) {
        rooms[roomKey] = [];
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

    if (ws.room && ws.sessionId) {

      const roomKey = `${ws.room}_${ws.sessionId}`;

      if (rooms[roomKey]) {

        rooms[roomKey] = rooms[roomKey].filter(
          (client) => client !== ws
        );

        // Broadcast updated user list after someone leaves
        if (rooms[roomKey] && rooms[roomKey].length > 0) {
          const users = rooms[roomKey].map((client) => client.username).filter(Boolean);
          rooms[roomKey].forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: "userlist", users }));
            }
          });
        } else if (rooms[roomKey] && rooms[roomKey].length === 0) {
          // Clean up empty rooms
          delete rooms[roomKey];
        }

      }

    }

  });

});

console.log("Server running on port 8000");