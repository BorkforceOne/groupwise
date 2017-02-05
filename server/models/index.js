const Attachment = require('./attachment.model');
const User = require('./user.model');
const Config = require('./config.model');
const ValidationToken = require('./validation-token.model');
const HostProfile = require('./host-profile.model');
const StudentProfile = require('./student-profile.model');

module.exports = {
  Attachment: Attachment,
  User: User,
  StudentProfile: StudentProfile,
  HostProfile: HostProfile,
  Config: Config,
  ValidationToken: ValidationToken
};
