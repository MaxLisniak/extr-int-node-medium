'use strict';
const socket = require('socket.io-client')('http://localhost:3000');
const ss = require('socket.io-stream');
const fs = require('fs');
var filename = __dirname + '/output/CopyOfTheArchive.zip';

socket.on('connect', function () {
  console.log('connected');
  socket.emit('sendmeafile');
});

ss(socket).on('sending', function (stream) {
  stream.pipe(fs.createWriteStream(filename));
  stream.on('end', function () {
    console.log('file received');
  });
});