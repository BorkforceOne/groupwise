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
        console.log("[SOCKET] Incomming connection, total: " + this.sockets.length);

        let sid = this.getSessionId(socket);
        if (sid === null) {
          socket.disconnect();
          console.log("[SOCKET] Removing socket due to no session");
          this.removeSocket(socket);
          return;
        }
        socket.sessionId = sid;

        let validSocket = true;

        this.getSession(sid)
          .then((session) => {
            if (session) {
              console.log(`[SOCKET] Established for session ${session.id} (UserID: ${session.userId})`);
              session.socketId = socket.id;
            }
            else {
              validSocket = false;
            }
          })
          .catch((e) => {
            validSocket = false;
          });

        if (validSocket === false) {
          socket.disconnect();
          console.log("[SOCKET] Removing socket due to invalid session");
          this.removeSocket(socket);
          return;
        }

        const socketChat = require('./socket-chat-manager');

        socket.on('disconnect', () => {
          console.log("[SOCKET] Removing disconnected client");
          this.removeSocket(socket);
        });

        socketChat.init(socket);
      });

      resolve();
    });
  }

  removeSocket(socket) {
    this.sockets.splice(this.sockets.indexOf(socket), 1);
  }

  getSessionId(socket) {
    if (!socket.request.headers.cookie)
      return null;

    let cookies = cookie.parse(socket.request.headers.cookie);
    return cookieParser.signedCookie(cookies['connect.sid'], config.session.secret);
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
      let iterations = [];
      let foundSocket = null;

      for (let i = 0; i < this.sockets.length; i ++) {
        let socket = this.sockets[i];
        let fn = this.getSession(socket.sessionId)
          .then((session) => {
            if (session && session.userId == userId) {
              foundSocket = socket;
            }
          });
        iterations.push(fn);
      }

      Promise.all(iterations).then(() => {
        if (foundSocket == null)
          reject("Could not find socket for specified user");
        else
          resolve(foundSocket);
      });
    });
  }
}

module.exports = new SocketManager();
