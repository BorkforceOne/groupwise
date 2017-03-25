import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var birthday = new Date(value);
    var diffMs = Date.now() - birthday.getTime();
    var agedate = new Date(diffMs);
    return Math.abs(agedate.getUTCFullYear() - 1970);
  }

}
