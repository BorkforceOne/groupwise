/**
 * Manager for user notifications.
 */

const mailermanager = require(./mailer-manager);

/**
 * Authenticates and generates a notification email and sends it to a user
 * @param user - The text to have in the subject field of the email
 * @param noteSub - The text subject of the email
 * @param noteBod - The text body of the email
 * @returns {*}
 */


notificationGenerator(user, noteSub, noteBod){
  //Check to see if user has proper permissions

  //Send email to user if authenticated
  mailermanager.generateTemplate(noteSub, noteBod, NULL);

}
