/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsumeTokenService } from './consume-token.service';

describe('ConsumeTokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsumeTokenService]
    });
  });

  it('should ...', inject([ConsumeTokenService], (service: ConsumeTokenService) => {
    expect(service).toBeTruthy();
  }));
});
