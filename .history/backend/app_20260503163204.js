const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

// test route (for Postman HTTP)
app.get("/", (req, res) => {
    res.send("Server running");
});

// create server
const server = http.createServer(app);

// websocket server
const wss = new WebSocket.Server({ server });

// store clients
let users = {};

wss.on("connection", (ws) => {
    console.log("User connected");

    // add user
    clients.push(ws);

    // username initially empty
    ws.username = "";

    // receive message
    ws.on("message", (message) => {
        const msg = message.toString();

        // first message = username
        if (ws.username === "") {
            ws.username = msg;
            users[ws.username] = ws;   // 🔥 store user
            console.log("Username set:", ws.username);
            return;
        }

        console.log(ws.username + ": " + msg);

        // send to all users
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(ws.username + ": " + msg);
            }
        });
    });

    // disconnect
    ws.on("close", () => {
        console.log("User disconnected");

        // remove user
        clients = clients.filter(client => client !== ws);
    });
});

// start server
server.listen(8000, () => {
    console.log("Server started on port 8000");
});