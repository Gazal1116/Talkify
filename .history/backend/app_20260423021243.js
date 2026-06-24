const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

// test route
app.get("/", (req, res) => {
    res.send("Server running");
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

let clients = [];

// ✅ MODIFY HERE
wss.on("connection", (ws) => {
    console.log("User connected");

    clients.push(ws);

    ws.on("message", (message) => {
        console.log("Received:", message.toString());

        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});

server.listen(8000, () => {
    console.log("Server started on port 8000");
});