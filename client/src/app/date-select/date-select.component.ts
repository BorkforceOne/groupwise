import {
  Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, Input, Output,
  EventEmitter
} from '@angular/core';
import {IMyDateModel, IMyDate, IMyInputFieldChanged, IMyDateRange} from "mydatepicker";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import * as moment from 'moment';

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
  @Input() private placeholder: string = '';
  @Input() private disableDateRanges: Array<IMyDateRange> = [];
  @Input() private disableDays: Array<IMyDate> = [];
  @Output() private blur: EventEmitter<Date> = new EventEmitter<Date>();

  private innerValue: any = '';
  private options: any = {
    dateFormat: 'mm/dd/yyyy',
    alignSelectorRight: true,
    disableDateRanges: this.disableDateRanges,
    disableDays: this.disableDays
  };

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
  
  onBlur(event: any) {
    if (event === 2) {
      this.blur.emit(this.value);
    }
  }

  onCalendarToggle(event: any) {
    if (event === 2 || event === 3 || event === 4) {
      this.blur.emit(this.value);
    }
  }

  onDateChanged(event: IMyDateModel) {
    if (event.jsdate != null) {
      this.value = event.jsdate.toISOString();
    }
    else {
      this.value = null;
    }
  }

  onInputFieldChanged(event: IMyInputFieldChanged) {
    let date = moment(event.value, event.dateFormat.toUpperCase(), true);
    if (date.isValid())
      return this.value = date.toISOString();
    return this.value = null;
  }

}
