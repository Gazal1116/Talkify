const WebSocket = require("ws");

const PORT = process.env.PORT || 8000;

const wss = new WebSocket.Server({ port: PORT });

const rooms = {};
const roomSessions = {};

wss.on("connection", (ws) => {
  console.log("✓ Client connected");

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    // JOIN ROOM
    if (data.type === "join") {
      console.log(`✓ User "${data.username}" joining room "${data.room}"`);

      ws.username = data.username;
      ws.room = data.room;

      let sessionId =
        roomSessions[data.room] ||
        (data.sessionId && data.sessionId !== "existing"
          ? data.sessionId
          : null);

      if (!sessionId) {
        sessionId = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 9)}`;
      }

      roomSessions[data.room] = sessionId;
      ws.sessionId = sessionId;

      const roomKey = `${data.room}_${sessionId}`;

      if (!rooms[roomKey]) {
        rooms[roomKey] = [];
      }

      rooms[roomKey].push(ws);

      console.log(
        `✓ Room "${roomKey}" now has ${rooms[roomKey].length} user(s)`
      );

      const users = rooms[roomKey]
        .map((client) => client.username)
        .filter(Boolean);

      rooms[roomKey].forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "userlist",
              users,
            })
          );
        }
      });

      return;
    }

    // SEND MESSAGE
    if (data.type === "message") {
      console.log(
        `✓ Message from "${data.username}": ${data.text.substring(0, 50)}`
      );

      const roomKey = `${data.room}_${ws.sessionId}`;
      const roomUsers = rooms[roomKey];

      if (!roomUsers) {
        console.log(`✗ Room "${roomKey}" not found`);
        return;
      }

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

  ws.on("error", (error) => {
    console.log(`✗ WebSocket error: ${error.message}`);
  });

  ws.on("close", () => {
    console.log("✓ Client disconnected");

    if (ws.room && ws.sessionId) {
      const roomKey = `${ws.room}_${ws.sessionId}`;

      if (rooms[roomKey]) {
        rooms[roomKey] = rooms[roomKey].filter(
          (client) => client !== ws
        );

        console.log(
          `✓ Room "${roomKey}" now has ${rooms[roomKey].length} user(s)`
        );

        if (rooms[roomKey].length > 0) {
          const users = rooms[roomKey]
            .map((client) => client.username)
            .filter(Boolean);

          rooms[roomKey].forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  type: "userlist",
                  users,
                })
              );
            }
          });
        } else {
          delete rooms[roomKey];
          console.log(`✓ Empty room "${roomKey}" deleted`);
        }
      }
    }
  });
});

console.log(`✓ WebSocket server running on port ${PORT}`);