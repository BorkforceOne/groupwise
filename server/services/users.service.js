const User = require('../models/user.model');

class UserService {

  constructor() {

  }

  getById(id) {
    return new Promise((resolve, reject) => {
      User.findOne({
          where: {
            Id: id
          }
        })
        .then(resolve)
        .catch(reject);
    });
  }

}

module.exports = new UserService();
