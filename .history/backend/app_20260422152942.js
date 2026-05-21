// 1. required modules
const express = require("express");
const http = require("http");       // important for websocket
const WebSocket = require("ws");    // websocket library

const app = express();

// 2. normal route (Postman HTTP test ke liye)
app.get("/", (req, res) => {
    res.send("Server running");
});

// 3. http server create
const server = http.createServer(app);

// 4. websocket server attach
const wss = new WebSocket.Server({ server });

// 5. connection event
wss.on("connection", (ws) => {
    console.log("User connected");

    // jab client message bheje
    ws.on("message", (message) => {
        console.log("Received:", message.toString());
    });
});
// 6. start server
server.listen(5000, () => {
    console.log("Server started on port 5000");
});