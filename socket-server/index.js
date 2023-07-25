const app = require('express')();
const http = require('http').createServer(app);
const readline = require('readline');

const PORT = 3000;

const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

// Establishing Socket connection
io.on('connection', (socket) => {
    console.log('Entity connected');
    socket.on('disconnect', () => {
        console.log('Entity disconnected');
    });

    socket.on('message', (msg) => {
        console.log('Message => ', msg);
    })
})

// Reading user inputs
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  io.emit('server-broadcast', input);
});

http.listen(PORT, () => {
    console.log('Listening in port 3000');
})