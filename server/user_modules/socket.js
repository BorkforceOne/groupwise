/**
 * Created by Brandon Garling on 12/3/2016.
 */
const cookie = require('cookie');
const store = require('../app').store;
const cookieParser = require("cookie-parser");
const config = require('../config');
module.exports = {};

let io = null;
module.exports.io = io;

const bootstrap = function(http) {
  // Setup the socket communication
  io = require('socket.io')(http);
  module.exports.io = io;

  io.on('connection', (socket) => {

    socket.on('disconnect', () => {

    });

    const socketChat = require('./socket-chat');
    socketChat.bootstrap(socket);
  });

  return io;
};
module.exports.bootstrap = bootstrap;

const getSocketGuid = function(socket) {
  let cookies = cookie.parse(socket.request.headers.cookie);
  return cookies['guid'];
};
module.exports.getSocketGuid = getSocketGuid;

const getSession = function(socket) {
  return new Promise((resolve, reject) => {
    let cookies = cookie.parse(socket.request.headers.cookie);
    let sid = cookieParser.signedCookie(cookies['connect.sid'], config.session.secret);
    store.get(sid)
      .then((session) => resolve(session))
      .catch((error) => reject(error));
  });
};
module.exports.getSession = getSession;
