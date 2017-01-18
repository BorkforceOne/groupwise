const nodemailer = require('nodemailer');
const config = require('../config');

class MailerManager {

  constructor() {
    this.context = null;
  }

  init() {
    // Generate a nodemailer transporter object that we can use to send emails
    this.context = nodemailer.createTransport(config.mailer.accounts[config.mailer.default].connectionString);
  }

  /**
   * Generates a nodemailer template object that can be used to send an email
   * @param subject - The text to have in the subject field of the email
   * @param text - The text contents of the email
   * @param html - The HTML contents of the email
   * @param defaults - The default values to use when sending this email
   * @returns {*}
   */
  generateTemplate(subject, text, html) {
    return transporter.templateSender({
      subject: subject,
      text: text,
      html: html
    }, config.mailer.accounts[config.mailer.default].defaults);
  }

}

module.exports = new MailerManager();
