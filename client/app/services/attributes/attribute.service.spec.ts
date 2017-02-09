/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AttributeService } from './attribute.service';

describe('AttributeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributeService]
    });
  });

  it('should ...', inject([AttributeService], (service: AttributeService) => {
    expect(service).toBeTruthy();
  }));
});
