const socketManager = require('./socket-manager');
const User = require('../models/user.model');

class SocketChatManager {
  init(socket) {
    socket.on('message', this.onMessage.bind(this, socket));
  }

  onMessage(socket, message) {
    let received = (new Date()).toISOString();

    socketManager.getSession(socket)
      .then((session) => {
        return User.findOne({
          where: {
            Id: session.userId
          }
        })
      })
      .then((user) => {
        socketManager.context.emit('on.message', {Message: message, UserId: user.Id, Received: received});
      })
  }
}

module.exports = new SocketChatManager();
