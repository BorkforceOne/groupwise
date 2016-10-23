/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RandomUserService } from './random-user.service';

describe('Service: RandomUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomUserService]
    });
  });

  it('should ...', inject([RandomUserService], (service: RandomUserService) => {
    expect(service).toBeTruthy();
  }));
});
