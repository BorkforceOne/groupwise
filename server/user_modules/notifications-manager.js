/**
 * Manager for user notifications.
 */


const mailerManager = require('./mailer-manager');

class NotificationsManager {

  constructor(){
    this.NotificationTypes = {
      GENERAL: 0,
      NEW_MATCH: 1,
      MESSAGE: 2
    };
  }

  init(){
    return new Promise((resolve, reject) =>{
      const User = require('./../models/user');
      let newUser = User.build();
      newUser.Email = 'mrn24@nau.edu';
      let mail = mailerManager.generateTemplate('FlagFriends Account', 'This is to inform you of your new account on FlagFriends!', '<b>Dear {{Firstname}} {{Lastname}},</b><br/><p>This is to inform you of your new account on FlagFriends!</p><br/>');
      this.sendNotification(mail, newUser, null, this.NotificationTypes.GENERAL)
      resolve();
    });

  }

  /**
   * Authenticates and generates a notification email and sends it to a user
   * @param user - The text to have in the subject field of the email
   * @param noteSub - The text subject of the email
   * @param noteBod - The text body of the email
   * @returns {*}
   */

  sendNotification(template, userTo, params, type) {
    return new Promise((resolve, reject) => {
      if (template == null || template == undefined) {
        throw "Template Undefined";
      }
      let sendNotification = false;

      switch (type) {
        case this.NotificationTypes.GENERAL:
          sendNotification = userTo.RecieveGeneralNotifications;
          break;
        case this.NotificationTypes.NEW_MATCH:
          sendNotification = userTo.RecieveNewMatchNotifications;
          break;
        case this.NotificationTypes.MESSAGE:
          sendNotification = userTo.RecieveMessageNotifications;
          break;
        default:
          throw "No type specified";
          break;
      }
      if (sendNotification) {
        template({to: userTo.Email}, params, (error)=>{
          if(error)
            reject(error);
          else
            resolve();
        });
      }
    });
  }
}
module.exports = new NotificationsManager();
