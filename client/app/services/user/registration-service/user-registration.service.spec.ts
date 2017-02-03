/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserRegistrationServiceService } from './user-registration.service';

describe('UserRegistrationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRegistrationServiceService]
    });
  });

  it('should ...', inject([UserRegistrationServiceService], (service: UserRegistrationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
