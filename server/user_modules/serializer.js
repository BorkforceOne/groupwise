const ErrorModule = require('../error');
const AppError = ErrorModule.AppError;
const AppErrorTypes = ErrorModule.AppErrorTypes;

module.exports = {};

/**
 * Serialize a Sequalize Model with only the serializable fields
 * that the model exposes.
 * @param model - The model to serialize
 * @returns {Object}
 */
const serializeModel = function(model) {
  return mapInstanceToData(model);
};
module.exports.serializeModel = serializeModel;

/**
 * Serializes an array of Sequlize Models
 * @param models - An array of models to serialize
 * @returns {Array}
 */
const serializeModels = function(models) {
  let serializedData = [];

  let iterations = [];

  for (let i = 0; i < models.length; i++) {
    let model = models[i];
    let fn = serializeModel(model)
      .then((data) => {
        serializedData.push(data);
      });
    iterations.push(fn);
  }

  return Promise.all(iterations).then(() => {
    return serializedData;
  });
};
module.exports.serializeModels = serializeModels;

const mapDataToEntity = function(entity, data) {
  return mapDataToInstance(entity.build(), data);
};
module.exports.mapDataToEntity = mapDataToEntity;

const mapDataToInstance = function(instance, data) {
  return new Promise((resolve, reject) => {
    if (instance == null)
      reject(new AppError("Cannot map null", AppErrorTypes.MAP_NULL_INSTANCE));

    const map = instance.getMap().inMap;

    for (let property in map) {
      if (map.hasOwnProperty(property) && data.hasOwnProperty(property)) {
        let mappedProperty = map[property];
        let type = 'STRING';
        let translatedProperty = mappedProperty;
        if (typeof mappedProperty === 'object') {
          type = mappedProperty.Type;
          translatedProperty = mappedProperty.Value;
        }

        switch (type) {
          case 'STRING':
            instance[translatedProperty] = data[property];
            break;

          case 'JSON':
            instance[translatedProperty] = JSON.stringify(data[property]);
            break;

          default:
            throw "Unknown type to map";
            break;
        }
      }
    }

    resolve(instance);
  });
};
module.exports.mapDataToInstance = mapDataToInstance;

const mapInstanceToData = function(instance) {
  return new Promise((resolve, reject) => {

    if (instance == null)
      reject(new AppError("Cannot map null", AppErrorTypes.MAP_NULL_INSTANCE));

    const map = instance.getMap().outMap;
    const data = {};

    for (let property in map) {
      if (map.hasOwnProperty(property)) {
        let mappedProperty = map[property];
        let type = 'STRING';
        let translatedProperty = mappedProperty;
        if (typeof mappedProperty === 'object') {
          type = mappedProperty.Type;
          translatedProperty = mappedProperty.Value;
        }

        switch (type) {
          case 'STRING':
            data[translatedProperty] = instance[property];
            break;

          case 'JSON':
            data[translatedProperty] = JSON.parse(instance[property]);
            break;

          default:
            throw "Unknown type to map";
            break;
        }
      }
    }

    resolve(data);
  });
};
module.exports.mapInstanceToData = mapInstanceToData;
