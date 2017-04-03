import { Injectable } from '@angular/core';

@Injectable()
export class CsvService {

  constructor() { }

  public download(data: Array<any>, filename: string = "report.csv") {
    let csv = "";
    let keys = Object.keys(data[0]);

    // Add header
    csv += keys.join(',');
    csv += "\n";

    // Add data
    data.forEach((datum, i) => {
      keys.forEach((key, j) => {
        csv += this.sanitizeData(datum[key]);
        if (j < keys.length - 1)
          csv += ",";
      });

      if (i < data.length - 1)
        csv += "\n";
    });

    if (navigator.msSaveBlob) {
      let blob = new Blob([csv], {"type": "text/csv;charset=utf8;"});
      navigator.msSaveBlob(blob, filename);
    } else {
      let uri = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      let link = document.createElement("a");

      link.href = uri;

      link.setAttribute('visibility', 'hidden');
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  private sanitizeData(data: any) {
    if (typeof data === 'string') {
      data = data.replace(/"/g, '""');
      if (data.indexOf(',') > -1 || data.indexOf('\n') > -1 || data.indexOf('\r') > -1)
        data = '"' + data + '"';
      return data;
    }

    if (typeof data === 'boolean') {
      return data ? 'TRUE' : 'FALSE';
    }

    return data;
  }

}
