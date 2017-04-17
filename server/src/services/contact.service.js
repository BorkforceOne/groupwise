const mailerManager = require('../user_modules/mailer-manager');

class ContactService {

  constructor() {

  }

  init() {

  }

  notify(content) {
    return new Promise((resolve, reject) => {
      let mail = mailerManager.templates.contact;

      let header = {
        to: mailerManager.getContactMailAddress()
      };

      let params = {
        Name: content.Name,
        Message: content.Message,
        FromEmail: content.From
      };

      mailerManager.sendMail(mail, header, params)
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = new ContactService();
