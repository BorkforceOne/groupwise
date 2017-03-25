/**
 * Created by bjg96 on 12/3/16.
 */
export class Serializable {

  fromJSON(json) {
    for (let propName in json)
      if (json.hasOwnProperty(propName))
        this[propName] = json[propName];
    return this;
  }

}
