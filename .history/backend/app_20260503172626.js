const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

app.get("/", (req, res) => {
    res.send("Server running");
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let users = {};
let rooms = {};

const broadcastToAll = (text) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(text);
        }
    });
};

wss.on("connection", (ws) => {
    console.log("User connected");

    ws.username = "";

    ws.on("message", (message) => {
        const msg = message.toString();

        // set username
        if (ws.username === "") {
            ws.username = msg;
            users[ws.username] = ws;
            console.log("Username set:", ws.username);
            return;
        }

        // 🔥 JOIN ROOM
        if (msg.startsWith("join:")) {
            const room = msg.split(":")[1];

            if (!rooms[room]) {
                rooms[room] = [];
            }

            rooms[room].push(ws.username);

            console.log(ws.username + " joined " + room);
            return;
        }

        // Optional room message format: room:<roomName>:<text>
        if (msg.startsWith("room:")) {
            const payload = msg.slice(5);
            const separatorIndex = payload.indexOf(":");

            if (separatorIndex !== -1) {
                const room = payload.slice(0, separatorIndex);
                const text = payload.slice(separatorIndex + 1);

                if (rooms[room]) {
                    rooms[room].forEach((user) => {
                        if (users[user] && users[user].readyState === WebSocket.OPEN) {
                            users[user].send(ws.username + ": " + text);
                        }
                    });
                    return;
                }
            }
        }

        // Direct message format: <receiverUsername>:<message>
        const privateSeparatorIndex = msg.indexOf(":");
        if (privateSeparatorIndex !== -1) {
            const receiver = msg.slice(0, privateSeparatorIndex);
            const text = msg.slice(privateSeparatorIndex + 1);

            if (users[receiver] && users[receiver].readyState === WebSocket.OPEN) {
                users[receiver].send(ws.username + ": " + text);

                if (ws.readyState === WebSocket.OPEN) {
                    ws.send("To " + receiver + ": " + text);
                }

                return;
            }

            if (ws.readyState === WebSocket.OPEN) {
                ws.send("System: User '" + receiver + "' is not connected");
            }

            return;
        }

        // Default: broadcast normal messages to everyone (including sender)
        broadcastToAll(ws.username + ": " + msg);
    });

    ws.on("close", () => {
        delete users[ws.username];

        // remove user from rooms
        for (let room in rooms) {
            rooms[room] = rooms[room].filter(u => u !== ws.username);
        }

        console.log("User disconnected:", ws.username);
    });
});

server.listen(8000, () => {
    console.log("Server started on port 8000");
});