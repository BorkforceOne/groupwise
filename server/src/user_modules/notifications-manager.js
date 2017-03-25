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

      resolve();
    });

  }

  /**
   * Checks notification preferences and generates a notification email and sends it to a user
   * @param template - Receives a nodemailer template function
   * @param userTo - User object who is receiving the notification
   * @param params - Specifics of the user for personalized emails
   * @param type - Type of notification for preference checking
   * @returns Promise <void>
   */

  sendNotification(template, userTo, params, type) {
    return new Promise((resolve, reject) => {
      if (template == null || template == undefined) {
        throw "Template Undefined";
      }
      let sendNotification = false;

      switch (type) {
        case this.NotificationTypes.GENERAL:
          sendNotification = userTo.ReceiveGeneralNotifications;
          break;
        case this.NotificationTypes.NEW_MATCH:
          sendNotification = userTo.ReceiveNewMatchNotifications;
          break;
        case this.NotificationTypes.MESSAGE:
          sendNotification = userTo.ReceiveMessageNotifications;
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
