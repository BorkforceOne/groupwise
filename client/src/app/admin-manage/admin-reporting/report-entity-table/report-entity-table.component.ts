import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-report-entity-table',
  templateUrl: './report-entity-table.component.html',
  styleUrls: ['./report-entity-table.component.scss'],
  inputs: ['data', 'keys']
})
export class ReportEntityTableComponent implements OnInit, OnChanges {
  private data: any[] = [];
  private keys: any[] = [];

  public rows: Array<any> = [];
  public columns: Array<any> = [];
  public config:any = {
    className: ['table-striped', 'table-bordered']
  };

  constructor() { }

  ngOnInit() {
    this.updateTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateTable();
  }

  updateTable() {
    if (this.data.length > 0) {
      let keys = [];

      if (this.keys.length > 0)
        keys = this.keys;
      else
        keys = Object.keys(this.data[0]);

      let columns = keys.map(key => {
        return {
          "title": key,
          "name": key
        }
      });

      this.rows = this.data;
      this.columns = columns;
    }
  }

}
