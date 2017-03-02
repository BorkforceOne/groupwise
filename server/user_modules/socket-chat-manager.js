const socketManager = require('./socket-manager');
const User = require('../models/user.model');

class SocketChatManager {
  init(socket) {
    socket.on('message', this.onMessage.bind(this, socket));
  }

  onMessage(socket, payload) {
    let received = (new Date()).toISOString();

    socketManager.getSession(socket.sessionId)
      .then((session) => {
        return User.findOne({
          where: {
            Id: session.userId
          }
        })
      })
      .then((user) => {
        let message = payload.Message;
        let userId = payload.UserId;
        socketManager.getSocket(userId)
          .then((otherSock) => {
            otherSock.emit('on.message', {Message: message, UserId: user.Id, Received: received});
          })
          .catch((e) => {
            console.error("Trying to send message to non-existent user");
          });
      })
  }
}

module.exports = new SocketChatManager();
