var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = require('chai').expect;
var should = require('chai').should;

describe('Encryption', function() {

  describe('generateSalt', function () {

    it('should generate a new salt', function() {
      let encryption = require('../src/user_modules/encryption-manager');

      return expect(encryption.generateSalt()).to.eventually.be.fulfilled;
    });

  });

});