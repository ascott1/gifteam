const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC = path.resolve(__dirname, 'public');

const server = express()
  .use(express.static(PUBLIC) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  // the gif event
  socket.on('giffed', () => io.emit('giffed'));
  // event when a user disconnects
  socket.on('disconnect', () => console.log('user disconnected'));

});
