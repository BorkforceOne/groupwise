const nodemailer = require('nodemailer');
const config = require('../config');

class MailerManager {

  constructor() {
    this.context = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      // Generate a nodemailer transporter object that we can use to send emails
      this.context = nodemailer.createTransport(config.mailer.accounts[config.mailer.default].connectionString);
      resolve();
    });
  }

  /**
   * Generates a nodemailer template object that can be used to send an email
   * @param subject - The text to have in the subject field of the email
   * @param text - The text contents of the email
   * @param html - The HTML contents of the email
   * @returns {*}
   */
  generateTemplate(subject, text, html) {
    return this.context.templateSender({
      subject: subject,
      text: text,
      html: html
    }, config.mailer.accounts[config.mailer.default].defaults);
  }

  /**
   * Sends a mail message generated from generateTemplate
   * @param mail - The mail item to send
   * @param header - Header information
   * @param params - Parameters to the mail template
   */
  sendMail(mail, header, params) {
    return new Promise((resolve, reject) => {
      mail(header, params, (error) => {
        if (error) {
          console.error("[MAILER] Could not dispatch email message, error: " + error);
          reject(error);
        }
        else
          resolve();
      })
    })
  }
}

module.exports = new MailerManager();
