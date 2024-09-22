const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});

io.listen(4000);

console.clear();
console.log('Server started'); 

io.on("connection", (client) => {
  const clientId = client.id;

  console.log(`Client "${clientId}" connected`); 

  client.on('disconnect', () => {
    console.log(`Client "${clientId}" disconnected`); 
  });
  client.on('message', (message, callback) => {
    console.log('on message:', message);
    io.emit('message', message);
    callback('ok');
  });
});
