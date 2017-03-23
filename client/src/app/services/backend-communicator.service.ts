import {Response} from "@angular/http";
import {RestError} from "./rest-error";
import {Alert} from "./alert/alert";
import {AlertService} from "./alert/alert.service";

export class BackendCommunicatorService {

  constructor(protected alertService: AlertService) {}

  protected extractData(model: any, res: Response): any {
    let error = this.parseError(res);
    if (error != null)
      throw error;

    let body = res.json();

    let data;

    if (model != undefined) {
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
    else {
      return body.Payload;
    }

  }

  protected parseError(res: Response) {
    let body = res.json();

    if (Array.isArray(body.Errors) && body.Errors.length > 0)
      return new RestError(body.Errors);
    if (body.Payload === undefined)
      return new RestError(["Invalid response"]);

    return null;
  }

  protected handleError(error: any): Promise<any> {
    if (error instanceof Response)
      error = this.parseError(error);

    const alert = new Alert();
    alert.Text = error.Errors.concat('\n');
    alert.Type = "danger";
    this.alertService.addAlert(alert);
    return Promise.reject(error.message || error);
  }
}
