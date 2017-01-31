/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegisterHostAdditionalPersonalInformationComponent } from './register-host-additional-personal-information.component';

describe('RegisterHostAdditionalPersonalInformationComponent', () => {
  let component: RegisterHostAdditionalPersonalInformationComponent;
  let fixture: ComponentFixture<RegisterHostAdditionalPersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterHostAdditionalPersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterHostAdditionalPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
