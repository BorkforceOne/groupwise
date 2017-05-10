var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = require('chai').expect;
var should = require('chai').should;

describe('Serializer', function() {

  class MockMap {
    constructor(inMap = {}, outMap = {}) {
      this.inMap = inMap;
      this.outMap = outMap;
    }
  }

  class MockModel {
    constructor(map = new MockMap(), values = {}) {
      this.__map = map;

      for (let key of Object.keys(values))
        this[key] = values[key];
    }

    getMap() {
      return this.__map;
    }
  }

  class MockBadModel {

  }

  describe('serializeModel', function () {
    it('should serialize an empty object', function() {
      let serializer = require('../src/user_modules/serializer');

      let model = new MockModel();

      return expect(serializer.serializeModel(model)).to.eventually.be.fulfilled;
    });

    it('should throw an exception if null is provided', function() {
      let serializer = require('../src/user_modules/serializer');

      return expect(serializer.serializeModel(null)).to.eventually.be.rejected;
    });

    it('should throw an exception if undefined is provided', function() {
      let serializer = require('../src/user_modules/serializer');

      return expect(serializer.serializeModel(undefined)).to.eventually.be.rejected;
    });

    it('should throw an exception if the provided object is not a SequelizeJS model', function() {
      let serializer = require('../src/user_modules/serializer');

      let model = new MockBadModel();

      return expect(serializer.serializeModel(model)).to.eventually.be.rejected;
    });

    it('should correctly serialize model with single property', function() {
      let serializer = require('../src/user_modules/serializer');

      let values = {
        'Id': 123321
      };

      let map = new MockMap({
        'Id': 'Id'
      }, {
        'Id': 'Id'
      });

      let model = new MockModel(map, values);

      let result = serializer.serializeModel(model);

      return expect(result).to.eventually.be.fulfilled
        .be.deep.equal(values);
    });

    it('should correctly serialize model with multiple properties', function() {
      let serializer = require('../src/user_modules/serializer');

      let values = {
        'Id': 123321,
        'Name': 'Donald'
      };

      let map = new MockMap({
        'Id': 'Id',
        'Name': 'Name'
      }, {
        'Id': 'Id',
        'Name': 'Name'
      });

      let model = new MockModel(map, values);

      let result = serializer.serializeModel(model);

      return expect(result).to.eventually.be.fulfilled
        .be.deep.equal(values);
    });

    it('should correctly serialize model with multiple properties, even if one does not exist in values', function() {
      let serializer = require('../src/user_modules/serializer');

      let valuesIn = {
        'Id': 123321,
        'Name': 'Donald',
      };

      let valuesOut = {
        'Id': 123321,
        'Name': 'Donald',
        'Age': undefined
      };

      let map = new MockMap({
        'Id': 'Id',
        'Name': 'Name',
        'Age': 'Age'
      }, {
        'Id': 'Id',
        'Name': 'Name',
        'Age': 'Age'
      });

      let model = new MockModel(map, valuesIn);

      let result = serializer.serializeModel(model);

      return expect(result).to.eventually.be.fulfilled
        .be.deep.equal(valuesOut);
    });

    it('should correctly serialize model with single property that translates', function() {
      let serializer = require('../src/user_modules/serializer');

      let valuesIn = {
        'Id': 123321
      };

      let valuesOut = {
        'Identification': 123321
      };

      let map = new MockMap({
        'Identification': 'Id'
      }, {
        'Id': 'Identification'
      });

      let model = new MockModel(map, valuesIn);

      let result = serializer.serializeModel(model);

      return expect(result).to.eventually.be.fulfilled
        .be.deep.equal(valuesOut);
    });

    it('should correctly serialize model with multiple properties that translates', function() {
      let serializer = require('../src/user_modules/serializer');

      let valuesIn = {
        'Id': 123321,
        'Name': 'Donald'
      };

      let valuesOut = {
        'Identification': 123321,
        'FullName': 'Donald'
      };

      let map = new MockMap({
        'Identification': 'Id',
        'FullName': 'Name'
      }, {
        'Id': 'Identification',
        'Name': 'FullName'
      });

      let model = new MockModel(map, valuesIn);

      let result = serializer.serializeModel(model);

      return expect(result).to.eventually.be.fulfilled
        .be.deep.equal(valuesOut);
    });

    it('should only serialize properties on model that are specified to be serialized', function() {
      let serializer = require('../src/user_modules/serializer');

      let valuesIn = {
        'Id': 123321,
        'Name': 'Donald'
      };

      let valuesOut = {
        'Name': 'Donald'
      };

      let map = new MockMap({
        'Name': 'Name'
      }, {
        'Name': 'Name'
      });

      let model = new MockModel(map, valuesIn);

      let result = serializer.serializeModel(model);

      return expect(result).to.eventually.be.fulfilled
        .be.deep.equal(valuesOut);
    });

    it('should only serialize special typed properties on model', function() {
      let serializer = require('../src/user_modules/serializer');

      let stats = {
        'Agility': 12,
        'Dogs': 23
      };

      let valuesIn = {
        'Id': 123321,
        'Stats': JSON.stringify(stats)
      };

      let valuesOut = {
        'Id': 123321,
        'Stats': stats
      };

      let map = new MockMap({
        'Id': 'Id',
      }, {
        'Id': 'Id',
        'Stats': {
          Type: 'JSON',
          Value: 'Stats'
        }
      });

      let model = new MockModel(map, valuesIn);

      let result = serializer.serializeModel(model);

      return expect(result).to.eventually.be.fulfilled
        .be.deep.equal(valuesOut);
    });

  });

});