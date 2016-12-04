module.exports = {};
const SocketHelper = require('./socket');
const User = require('../models/user');

const bootstrap = function(socket) {
  socket.on('message', onMessage.bind(this, socket));
};
module.exports.bootstrap = bootstrap;

const onMessage = function(socket, message) {
  SocketHelper.getSession(socket)
    .then((session) => {
      return User.findOne({
        where: {
          Id: session.userId
        }
      })
    })
    .then((user) => {
      message = `${user.Firstname} ${user.Lastname}: ${message}`;
      SocketHelper.io.emit('on.message', {text: message});
    })
};
