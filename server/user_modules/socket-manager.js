const cookie = require('cookie');
const express = require('./express-manager');
const cookieParser = require("cookie-parser");
const config = require('../config');
const socketio = require('socket.io');
const http = require('./http-manager');

class SocketManager {

  constructor() {
    this.context = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      // Setup the socket communication
      this.context = socketio(http.context);

      this.context.on('connection', (socket) => {

        socket.on('disconnect', () => {

        });

        const socketChat = require('./socket-chat-manager');
        socketChat.init(socket);

        resolve();
      });
    });
  }

  getSocketGuid(socket) {
    let cookies = cookie.parse(socket.request.headers.cookie);
    return cookies['guid'];
  };

  getSession(socket) {
    return new Promise((resolve, reject) => {
      let cookies = cookie.parse(socket.request.headers.cookie);
      let sid = cookieParser.signedCookie(cookies['connect.sid'], config.session.secret);
      express.sessionStore.get(sid)
        .then((session) => resolve(session))
        .catch((error) => reject(error));
    });
  };
}

module.exports = new SocketManager();
