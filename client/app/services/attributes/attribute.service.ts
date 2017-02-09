import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {AlertService} from "../alert/alert.service";
import {Observable} from "rxjs";
import {AttributeString} from "./attribute-string.model";
import {RestError} from "../rest-error";
import {Alert} from "../alert/alert";
import {Attribute} from "./attribute.model";
import {AttributeStringValue} from "./attribute-string-value.model";

@Injectable()
export class AttributeService {
  private stringRemoteUrlBase = '/api/v1/attribute-strings';
  private stringValueRemoteUrlBase = '/api/v1/attribute-string-values';

  constructor(private http: Http, private alertService: AlertService) { }

  getAttributeStrings(): Observable<AttributeString[]> {
    return this.http.get(this.stringRemoteUrlBase)
      .map(this.extractData.bind(this, AttributeString))
      .catch(this.handleError);
  }

  private mapToAttribute(data): Attribute[] {
    let attributes: Attribute[] = [];

    for (let i = 0; i < data.length; i ++) {
      let dataum = data[i];

       let attribute = new Attribute();
       attribute.Type = dataum;

       if (dataum instanceof AttributeString)
       attribute.Value = new AttributeStringValue();

       attributes.push(attribute);
    }

    return attributes;
  }

  getAllAttributes(): Observable<Attribute[]> {
    return Observable.forkJoin(
      this.getAttributeStrings().map(this.mapToAttribute)
    ).map((data) => {
      let attributes: Attribute[] = [];

      for (let i = 0; i < data.length; i ++) {
        let dataum = data[i];

        attributes = attributes.concat(dataum);
      }

      return attributes;
    });
  }

  private extractData(model: any, res: Response) {
    let body = res.json();
    if (Array.isArray(body.Errors) && body.Errors.length > 0)
      throw new RestError(body.Errors);
    if (body.Payload === undefined)
      throw new RestError(["Invalid response"]);

    let data;

    if (Array.isArray(body.Payload)) {
      data = [];
      for (let dataum in body.Payload) {
        data.push(new model().fromJSON(body.Payload[dataum]));
      }
    }
    else {
      data = new model().fromJSON(body.Payload);
    }

    return data;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    const alert = new Alert();
    alert.Text = error.Errors.concat('\n');
    alert.Type = "danger";
    this.alertService.addAlert(alert);
    return Promise.reject(error.message || error);
  }
}
