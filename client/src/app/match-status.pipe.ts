import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchStatus'
})
export class MatchStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value){
      case 'PROPOSED':
        return 'PENDING';
      case 'APPROVED':
        return 'ACCEPTED';
      case 'REJECTED':
        return 'REJECTED';
      case 'UNMATCHED':
        return 'REJECTED';
    }
  }

}
