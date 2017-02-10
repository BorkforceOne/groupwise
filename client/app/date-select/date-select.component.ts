import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef} from '@angular/core';
import {IMyDateModel, IMyDate} from "mydatepicker";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateSelectComponent),
  multi: true
};

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DateSelectComponent implements OnInit, ControlValueAccessor {
  //The internal data model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private selDate: IMyDate = null;

  constructor() { }

  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v != this.innerValue) {
      if (v) {
        this.selDate = {year: 0, month: 0, day: 0};
        let date = new Date(v);
        this.selDate.year = date.getFullYear();
        this.selDate.month = date.getMonth() + 1;
        this.selDate.day = date.getDate();
      }
      else {
        this.selDate = null;
      }
      this.onChangeCallback(v);
      this.innerValue = v;
    }
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value && value !== this.innerValue) {
      this.selDate = {year: 0, month: 0, day: 0};
      let date = new Date(value);
      this.selDate.year = date.getFullYear();
      this.selDate.month = date.getMonth() + 1;
      this.selDate.day = date.getDate();

      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnInit() {

  }

  onDateChanged(event: IMyDateModel) {
    if (event.jsdate != null) {
      this.value = event.jsdate.toISOString();
    }
    else {
      this.value = null;
    }
  }

}
