let readyPlayers = 0;

const listen = (io) => {
  const pongNameSpace = io.of("/pong");
  pongNameSpace.on("connection", (socket) => {
    let room;
    console.log("a user connected!", socket.id);

    socket.on("ready", () => {
      room = "room" + Math.floor(readyPlayers / 2);
      socket.join(room);

      console.log("Player ready ", socket.id, room);
      readyPlayers++;
      if (readyPlayers % 2 === 0) {
        pongNameSpace.in(room).emit("startGame", socket.id);
      }
    });
    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });
    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });
    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.io}disconnected: ${reason}`);
      socket.leave(room);
    });
  });
};

module.exports = { listen };
