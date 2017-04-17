const socketManager = require('./socket-manager');
const User = require('../models/user.model');
const ChatMessage = require('../models/chat-message.model');
const serializer = require('./serializer');

class SocketChatManager {
  init(socket) {
    socket.on('message', this.onMessage.bind(this, socket));
    socket.on('message.history', this.onMessageHistory.bind(this, socket));
  }

  onMessage(socket, payload) {
    this.getSocketUser(socket)
      .then((user) => {
        let model = ChatMessage.build();
        model.To = payload.UserId;
        model.From = user.Id;
        model.Message = payload.Message;

        model.save().then(() => {
          socketManager.getSocket(model.To)
            .then((otherSock) => {
              otherSock.emit('on.message', {Message: model.Message, UserId: model.From, Received: model.createdAt, Id: model.Id});
              model.Seen = true;
              model.save();
            })
            .catch((e) => {
              console.error("Trying to send message to non-live user");
            });
        });
      })
  }

  onMessageHistory(socket, payload) {
    let foundUser = null;
    let foundMessages = [];

    this.getSocketUser(socket)
      .then((user) => {
        foundUser = user;
        return ChatMessage.findAll({
          where: {
            $or: [
              {
                To: payload.UserId,
                From: user.Id
              },
              {
                To: user.Id,
                From: payload.UserId
              }
            ]
          },
          order: 'createdAt DESC',
          limit: 20
        })
      })
      .then((messages) => {
        foundMessages = messages;
        return foundMessages;
      })
      .then(serializer.serializeModels)
      .then((messages) => {
        socketManager.getSocket(foundUser.Id)
          .then((otherSock) => {
            otherSock.emit('on.message.history', messages);

            // Mark messages as seen
            let seenMessages = foundMessages.filter((message) => message.Seen === false && message.To === foundUser.Id)

            seenMessages.forEach((message) => {
              message.Seen = true;
              message.save();
            })
          })
          .catch((e) => {
            console.error("Trying to send message to non-live user");
          });
      });
  }

  getSocketUser(socket) {
    return socketManager.getSession(socket.sessionId)
      .then((session) => {
        if (session === null)
          throw new Error(`[SOCKET] Could not find session for session ${socket.sessionId}`);

        return User.findOne({
          where: {
            Id: session.userId
          }
        })
      })
  }
}

module.exports = new SocketChatManager();
