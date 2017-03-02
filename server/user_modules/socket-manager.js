const cookie = require('cookie');
const express = require('./express-manager');
const cookieParser = require("cookie-parser");
const config = require('../config');
const socketio = require('socket.io');
const http = require('./http-manager');

class SocketManager {

  constructor() {
    this.context = null;
    this.sockets = [];
  }

  init() {
    return new Promise((resolve, reject) => {
      // Setup the socket communication
      this.context = socketio(http.context);

      this.context.on('connection', (socket) => {
        this.sockets.push(socket);

        let sid = this.getSessionId(socket);
        socket.sessionId = sid;

        this.getSession(sid)
          .then((session) => {
            if (session) {
              session.socketId = socket.id;
            }
          })
          .catch((e) => {
            console.error(e);
          });

        const socketChat = require('./socket-chat-manager');

        socket.on('disconnect', () => {
          this.sockets.splice(this.sockets.indexOf(socketChat), 1);
          console.log("[SOCKET] Removing disconnected client");
        });

        socketChat.init(socket);
      });

      resolve();
    });
  }

  getSessionId(socket) {
    let cookies = cookie.parse(socket.request.headers.cookie);
    let sid = cookieParser.signedCookie(cookies['connect.sid'], config.session.secret);
    return sid;
  }

  getSession(sid) {
    return new Promise((resolve, reject) => {
      express.sessionStore.get(sid)
        .then((session) => resolve(session))
        .catch((error) => reject(error));
    });
  };

  getSocket(userId) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.sockets.length; i ++) {
        let socket = this.sockets[i];
        this.getSession(socket.sessionId)
          .then((session) => {
            if (session && session.userId == userId) {
              resolve(socket);
            }
          })
          .catch();
      }
    });
  }
}

module.exports = new SocketManager();
