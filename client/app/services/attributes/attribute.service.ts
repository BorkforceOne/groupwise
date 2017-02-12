import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {AlertService} from "../alert/alert.service";
import {Observable} from "rxjs";
import {AttributeString} from "./attribute-string.model";
import {RestError} from "../rest-error";
import {Alert} from "../alert/alert";
import {Attribute} from "./attribute.model";
import {AttributeStringValue} from "./attribute-string-value.model";
import {AttributeDate} from "./attribute-date.model";
import {AttributeDateValue} from "./attribute-date-value.model";
import {AttributeRange} from "./attribute-range.model";
import {AttributeRangeValue} from "./attribute-range-value.model";
import {AttributeEnum} from "./attribute-enum.model";
import {AttributeEnumValue} from "./attribute-enum-value.model";
import {User} from "../user/user";
import {BackendCommunicatorService} from "../backend-communicator.service";

@Injectable()
export class AttributeService extends BackendCommunicatorService{
  private headers = new Headers({'Content-Type': 'application/json'});

  private stringRemoteUrlBase = '/api/v1/attribute-strings';
  private stringValueRemoteUrlBase = '/api/v1/attribute-string-values';
  private dateRemoteUrlBase = '/api/v1/attribute-dates';
  private dateValueRemoteUrlBase = '/api/v1/attribute-date-values';
  private rangeRemoteUrlBase = '/api/v1/attribute-ranges';
  private rangeValueRemoteUrlBase = '/api/v1/attribute-range-values';
  private enumRemoteUrlBase = '/api/v1/attribute-enums';
  private enumValueRemoteUrlBase = '/api/v1/attribute-enum-values';

  constructor(private http: Http, alertService: AlertService) {
    super(alertService);
  }

  getAttributeStrings(): Observable<AttributeString[]> {
    return this.http.get(this.stringRemoteUrlBase)
      .map(this.extractData.bind(this, AttributeString))
      .catch(this.handleError.bind(this));
  }

  getAttributeDates(): Observable<AttributeDate[]> {
    return this.http.get(this.dateRemoteUrlBase)
      .map(this.extractData.bind(this, AttributeDate))
      .catch(this.handleError.bind(this));
  }

  getAttributeRanges(): Observable<AttributeRange[]> {
    return this.http.get(this.rangeRemoteUrlBase)
      .map(this.extractData.bind(this, AttributeRange))
      .catch(this.handleError.bind(this));
  }

  getAttributeEnums(): Observable<AttributeRange[]> {
    return this.http.get(this.enumRemoteUrlBase)
      .map(this.extractData.bind(this, AttributeEnum))
      .catch(this.handleError.bind(this));
  }

  getAttributeStringValues(userId: number): Observable<AttributeStringValue[]> {
    if (userId == undefined) {
      return this.http.get(this.stringValueRemoteUrlBase)
        .map(this.extractData.bind(this, AttributeStringValue))
        .catch(this.handleError.bind(this));
    }
    return this.http.get(`${this.stringValueRemoteUrlBase}/${userId}`)
      .map(this.extractData.bind(this, AttributeStringValue))
      .catch(this.handleError.bind(this));
  }

  getAttributeDateValues(userId: number): Observable<AttributeDateValue[]> {
    if (userId == undefined) {
      return this.http.get(this.dateValueRemoteUrlBase)
        .map(this.extractData.bind(this, AttributeDateValue))
        .catch(this.handleError.bind(this));
    }
    return this.http.get(`${this.dateValueRemoteUrlBase}/${userId}`)
      .map(this.extractData.bind(this, AttributeDateValue))
      .catch(this.handleError.bind(this));
  }

  getAttributeRangeValues(userId: number): Observable<AttributeRangeValue[]> {
    if (userId == undefined) {
      return this.http.get(this.rangeValueRemoteUrlBase)
        .map(this.extractData.bind(this, AttributeRangeValue))
        .catch(this.handleError.bind(this));
    }
    return this.http.get(`${this.rangeValueRemoteUrlBase}/${userId}`)
      .map(this.extractData.bind(this, AttributeRangeValue))
      .catch(this.handleError.bind(this));
  }

  getAttributeEnumValues(userId: number): Observable<AttributeEnumValue[]> {
    if (userId == undefined) {
      return this.http.get(this.enumValueRemoteUrlBase)
        .map(this.extractData.bind(this, AttributeEnumValue))
        .catch(this.handleError.bind(this));
    }
    return this.http.get(`${this.enumValueRemoteUrlBase}/${userId}`)
      .map(this.extractData.bind(this, AttributeEnumValue))
      .catch(this.handleError.bind(this));
  }

  private mapToAttribute(data): Attribute[] {
    let attributes: Attribute[] = [];

    for (let i = 0; i < data.length; i ++) {
      let dataum = data[i];

      let attribute = new Attribute();
      attribute.Type = dataum;

      if (dataum instanceof AttributeString) {
        attribute.Value = new AttributeStringValue();
      }

      if (dataum instanceof AttributeDate) {
        attribute.Value = new AttributeDateValue();
      }

      if (dataum instanceof AttributeRange) {
        attribute.Value = new AttributeRangeValue();
      }

      if (dataum instanceof AttributeEnum) {
        attribute.Value = new AttributeEnumValue();
      }

      attribute.Value.AttributeId = attribute.Type.Id;

      attributes.push(attribute);
    }

    return attributes;
  }

  private mapOverModel(model, data): any {
    for (let prop in data)
      if (data.hasOwnProperty(prop))
        model[prop] = data[prop];
  }

  getAllAttributes(): Observable<Attribute[]> {
    return Observable.forkJoin(
      this.getAttributeStrings().map(this.mapToAttribute),
      this.getAttributeDates().map(this.mapToAttribute),
      this.getAttributeRanges().map(this.mapToAttribute),
      this.getAttributeEnums().map(this.mapToAttribute),
    ).map((data) => {
      let attributes: Attribute[] = [];

      for (let i = 0; i < data.length; i ++) {
        let dataum = data[i];

        attributes = attributes.concat(dataum);
      }

      return attributes;
    });
  }

  private _getAllAttributes(): Observable<any> {
    return Observable.forkJoin(
      this.getAttributeStrings(),
      this.getAttributeDates(),
      this.getAttributeRanges(),
      this.getAttributeEnums()
    ).map((data) => {
      let values: any[] = [];

      for (let i = 0; i < data.length; i ++) {
        let dataum = data[i];

        values = values.concat(dataum);
      }

      return values;
    });
  }

  private _getAllAttributeValues(userId): Observable<any> {
    return Observable.forkJoin(
      this.getAttributeStringValues(userId),
      this.getAttributeDateValues(userId),
      this.getAttributeRangeValues(userId),
      this.getAttributeEnumValues(userId)
    ).map((data) => {
      let values: any[] = [];

      for (let i = 0; i < data.length; i ++) {
        let dataum = data[i];

        values = values.concat(dataum);
      }

      return values;
    });
  }

  getAllAttributesAndValues(): Observable<Attribute[]> {
    return Observable.forkJoin(
      this._getAllAttributes().map((data) => {
        return {
          Type: "ATTRIBUTES",
          Data: data
        }
      }),
      this._getAllAttributeValues(undefined).map((data) => {
        return {
          Type: "VALUES",
          Data: data
        }
      })
    ).map((data) => {
      let finalAttributes: Attribute[] = [];

      let attributes = data.filter((entry) => (entry.Type == "ATTRIBUTES"))[0].Data;
      let values = data.filter((entry) => (entry.Type == "VALUES"))[0].Data;

      for (let i = 0; i < values.length; i ++) {
        let finalAttribute = new Attribute();

        let value = values[i];
        let attribute = attributes.filter((entry) => (entry.Id == value.AttributeId && this._isValueAndAttributeTypeMatch(value, entry)))[0];

        finalAttribute.Type = attribute;
        finalAttribute.Value = value;

        finalAttributes.push(finalAttribute);
      }

      return finalAttributes;
    });
  }

  getUserAttributesAndValues(user: User): Observable<Attribute[]> {
    let userId = user.Id;

    return Observable.forkJoin(
      this._getAllAttributes().map((data) => {
        return {
          Type: "ATTRIBUTES",
          Data: data
        }
      }),
      this._getAllAttributeValues(userId).map((data) => {
        return {
          Type: "VALUES",
          Data: data
        }
      })
    ).map((data) => {
      let finalAttributes: Attribute[] = [];

      let attributes = data.filter((entry) => (entry.Type == "ATTRIBUTES"))[0].Data;
      let values = data.filter((entry) => (entry.Type == "VALUES"))[0].Data;

      for (let i = 0; i < values.length; i ++) {
        let finalAttribute = new Attribute();

        let value = values[i];
        let attribute = attributes.filter((entry) => (entry.Id == value.AttributeId && this._isValueAndAttributeTypeMatch(value, entry)))[0];

        finalAttribute.Type = attribute;
        finalAttribute.Value = value;

        finalAttributes.push(finalAttribute);
      }

      return finalAttributes;
    });
  }

  private _isValueAndAttributeTypeMatch(value: any, attribute: any) : boolean {
    if (attribute instanceof AttributeDate && value instanceof AttributeDateValue)
      return true;
    if (attribute instanceof AttributeString && value instanceof AttributeStringValue)
      return true;
    if (attribute instanceof AttributeRange && value instanceof AttributeRangeValue)
      return true;
    if (attribute instanceof AttributeEnum && value instanceof AttributeEnumValue)
      return true;

    return false;
  }

  createAttributeStringValue(attributeValue: AttributeStringValue) {
    return this
      .http.post(this.stringValueRemoteUrlBase, JSON.stringify(attributeValue), {headers: this.headers})
      .map(this.extractData.bind(this, AttributeStringValue))
      .catch(this.handleError.bind(this));
  }

  createAttributeEnumValue(attributeValue: AttributeEnumValue) {
    return this
      .http.post(this.enumValueRemoteUrlBase, JSON.stringify(attributeValue), {headers: this.headers})
      .map(this.extractData.bind(this, AttributeEnumValue))
      .catch(this.handleError.bind(this));
  }

  createAttributeDateValue(attributeValue: AttributeDateValue) {
    return this
      .http.post(this.dateValueRemoteUrlBase, JSON.stringify(attributeValue), {headers: this.headers})
      .map(this.extractData.bind(this, AttributeDateValue))
      .catch(this.handleError.bind(this));
  }

  createAttributeRangeValue(attributeValue: AttributeRangeValue) {
    return this
      .http.post(this.rangeValueRemoteUrlBase, JSON.stringify(attributeValue), {headers: this.headers})
      .map(this.extractData.bind(this, AttributeRangeValue))
      .catch(this.handleError.bind(this));
  }

  updateAttributeStringValue(attributeValue: AttributeStringValue) {
    return this
      .http.put(`${this.stringValueRemoteUrlBase}/${attributeValue.Id}`, JSON.stringify(attributeValue), {headers: this.headers})
      .map(this.extractData.bind(this, AttributeStringValue))
      .catch(this.handleError.bind(this));
  }

  updateAttributeEnumValue(attributeValue: AttributeEnumValue) {
    return this
      .http.put(`${this.enumValueRemoteUrlBase}/${attributeValue.Id}`, JSON.stringify(attributeValue), {headers: this.headers})
      .map(this.extractData.bind(this, AttributeEnumValue))
      .catch(this.handleError.bind(this));
  }

  updateAttributeDateValue(attributeValue: AttributeDateValue) {
    return this
      .http.put(`${this.dateValueRemoteUrlBase}/${attributeValue.Id}`, JSON.stringify(attributeValue), {headers: this.headers})
      .map(this.extractData.bind(this, AttributeDateValue))
      .catch(this.handleError.bind(this));
  }

  updateAttributeRangeValue(attributeValue: AttributeRangeValue) {
    return this
      .http.put(`${this.rangeValueRemoteUrlBase}/${attributeValue.Id}`, JSON.stringify(attributeValue), {headers: this.headers})
      .map(this.extractData.bind(this, AttributeRangeValue))
      .catch(this.handleError.bind(this));
  }

  updateAllAttributes(attributes: Attribute[]): Promise<Attribute[]> {
    let fns = [];
    for (let i = 0; i < attributes.length; i ++) {
      let attribute = attributes[i];

      if (attribute.Value.Id) {
        // Update

        if (attribute.Type instanceof AttributeString)
          fns.push(this.updateAttributeStringValue(attribute.Value).map(this.mapOverModel.bind(this, attribute.Value)));
        if (attribute.Type instanceof AttributeEnum)
          fns.push(this.updateAttributeEnumValue(attribute.Value).map(this.mapOverModel.bind(this, attribute.Value)));
        if (attribute.Type instanceof AttributeDate)
          fns.push(this.updateAttributeDateValue(attribute.Value).map(this.mapOverModel.bind(this, attribute.Value)));
        if (attribute.Type instanceof AttributeRange)
          fns.push(this.updateAttributeRangeValue(attribute.Value).map(this.mapOverModel.bind(this, attribute.Value)));
      }
      else {
        // Create

        if (attribute.Type instanceof AttributeString)
          fns.push(this.createAttributeStringValue(attribute.Value).map(this.mapOverModel.bind(this, attribute.Value)));
        if (attribute.Type instanceof AttributeEnum)
          fns.push(this.createAttributeEnumValue(attribute.Value).map(this.mapOverModel.bind(this, attribute.Value)));
        if (attribute.Type instanceof AttributeDate)
          fns.push(this.createAttributeDateValue(attribute.Value).map(this.mapOverModel.bind(this, attribute.Value)));
        if (attribute.Type instanceof AttributeRange)
          fns.push(this.createAttributeRangeValue(attribute.Value).map(this.mapOverModel.bind(this, attribute.Value)));

      }
    }

    return Observable.forkJoin(fns).map((data) => {
      let attributes: Attribute[] = [];

      return attributes;
    }).toPromise();

  }
}
