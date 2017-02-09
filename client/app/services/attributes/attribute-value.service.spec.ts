/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AttributeValueService } from './attribute-value.service';

describe('AttributeValueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributeValueService]
    });
  });

  it('should ...', inject([AttributeValueService], (service: AttributeValueService) => {
    expect(service).toBeTruthy();
  }));
});
