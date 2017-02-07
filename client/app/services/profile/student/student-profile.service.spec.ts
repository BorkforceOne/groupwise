/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentProfileService } from './student-profile.service';

describe('StudentProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentProfileService]
    });
  });

  it('should ...', inject([StudentProfileService], (service: StudentProfileService) => {
    expect(service).toBeTruthy();
  }));
});
