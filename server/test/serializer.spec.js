describe('Serializer', function() {

  class MockModel {
    getMap() {
      return {};
    }
  }

// necessary
  it('should serialize a single object', function() {
    let serializer = require('../src/user_modules/serializer');

    let model = new MockModel();

    serializer.serializeModel(model);
  });
});