const http = require("http");
const io = require("socket.io");
const sockets = require("./socket");

const apiServer = require("./api");
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 1000;

httpServer.listen(PORT);
console.log(`listening on PORT ${PORT}`);

sockets.listen(socketServer);
