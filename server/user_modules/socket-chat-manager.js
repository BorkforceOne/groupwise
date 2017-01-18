const socketManager = require('./socket-manager');
const User = require('../models/user');

class SocketChatManager {
  init(socket) {
    socket.on('message', this.onMessage.bind(this, socket));
  }

  onMessage(socket, message) {
    socketManager.getSession(socket)
      .then((session) => {
        return User.findOne({
          where: {
            Id: session.userId
          }
        })
      })
      .then((user) => {
        message = `${user.Firstname} ${user.Lastname}: ${message}`;
        socketManager.context.emit('on.message', {text: message});
      })
  }
}

module.exports = new SocketChatManager();
