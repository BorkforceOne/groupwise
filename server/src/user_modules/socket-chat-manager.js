const socketManager = require('./socket-manager');
const User = require('../models/user.model');
const Match = require('../models/match.model');
const ChatMessage = require('../models/chat-message.model');
const serializer = require('./serializer');
const _ = require('lodash');

class SocketChatManager {
  init(socket) {
    socket.on('message', this.onMessage.bind(this, socket));
    socket.on('message.history', this.onMessageHistory.bind(this, socket));
    socket.on('notifications', this.onNotifiations.bind(this, socket));
  }

  onNotifiations(socket, payload) {
    this.getSocketUser(socket, [{model: Match, as: 'HostMatches'}, {model: Match, as: 'StudentMatches'}, {model: ChatMessage, as: 'ReceivedMessages'}])
      .then((user) => {
        if (user === null)
          return [];

        return new Promise((resolve, reject) => {
          let notifications = [];

          switch (user.Type) {
            case 'STUDENT':
              // Check for new matches
              user.StudentMatches
                .filter((match) => match.Status === 'PROPOSED')
                .forEach((match) => {
                  var notif = {};
                  notif['Type'] = 'MATCH_REQUEST';
                  notif['UserId'] = match.HostUserId;
                  notif['createdAt'] = match.createdAt;
                  notifications.push(notif);
                });

              // Get all unique users who newly messaged this person
              var messages = user.ReceivedMessages
                .filter((message) => message.Seen === false);

              var users = _.countBy(messages, "From");

              _.forOwn(users, (count, from) => {
                var notif = {};
                notif['Type'] = 'NEW_MESSAGE';
                notif['UserId'] = from;
                notif['Count'] = count;
                notifications.push(notif);
              });
              return resolve(notifications);
              break;

            case 'HOST':
              // Get all unique users who newly messaged this person
              var messages = user.ReceivedMessages
                .filter((message) => message.Seen === false);

              var users = _.countBy(messages, "From");

              _.forOwn(users, (count, from) => {
                var notif = {};
                notif['Type'] = 'NEW_MESSAGE';
                notif['UserId'] = from;
                notif['Count'] = count;
                notifications.push(notif);
              });
              return resolve(notifications);
              break;

            case 'ADMINISTRATOR':
              // Check for pending users
              User.findAll({
                where: {
                  Status: 'PENDING_REVIEW'
                }
              }).then((users) => {
                var notif = {};
                notif['Type'] = 'PENDING_USERS';
                notif['Count'] = users.length;
                notifications.push(notif);
                resolve(notifications);
              });
              break;
          }

        })
          .then((notifications) => socket.emit('on.notifications', notifications));
      })
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

  getSocketUser(socket, include=[]) {
    return socketManager.getSession(socket.sessionId)
      .then((session) => {
        if (session === null)
          throw new Error(`[SOCKET] Could not find session for session ${socket.sessionId}`);

        return User.findOne({
          where: {
            Id: session.userId
          },
          include: include
        })
      })
  }
}

module.exports = new SocketChatManager();
