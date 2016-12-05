/**
 * Created by Brandon Garling on 11/5/2016.
 */
module.exports = {};

/**
 * Serialize a Sequalize Model with only the serializable fields
 * that the model exposes.
 * @param model - The model to serialize
 * @returns {Object}
 */
const serializeModel = function(model) {
  let data = model.get({plain: true});
  let serializedData = {};
  let serializableFields = model.getSerializableFields();
  for (let i=0; i<serializableFields.length; i++) {
    let field = serializableFields[i];
    let fieldName;
    let type = null;
    if (typeof field === "string")
      fieldName = field;
    else {
      fieldName = field.name;
      type = field.type;
    }

    if (data.hasOwnProperty(fieldName)) {
      switch (type) {
        case 'JSON':
          serializedData[fieldName] = JSON.parse(data[fieldName]);
          break;
        default:
          serializedData[fieldName] = data[fieldName];
      }
    }
  }

  return serializedData;
};
module.exports.serializeModel = serializeModel;

/**
 * Serializes an array of Sequlize Models
 * @param models - An array of models to serialize
 * @returns {Array}
 */
const serializeModels = function(models) {
  let serializedData = [];
  for (let i = 0; i < models.length; i++) {
    let model = models[i];
    let entry = serializeModel(model);
    if (Object.keys(entry).length > 0)
      serializedData.push(entry);
  }

  return serializedData;
};
module.exports.serializeModels = serializeModels;
