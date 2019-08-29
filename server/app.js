const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const randomNumber = require('./randomNumber');

const port = process.env.PORT || 3000;

app.use(express.static('./build'));

io.on('connection', function (socket) {
  console.log('connect');

  const unsubscribe = randomNumber.subscribe(function (number) {
    console.log(number);

    socket.emit('data', {value: number, timestamp: Number(new Date())});
  });

  socket.on('disconnect', function () {
    console.log('disconnect');
    unsubscribe();
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
