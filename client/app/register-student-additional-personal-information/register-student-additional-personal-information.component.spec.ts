/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegisterStudentAdditionalPersonalInformationComponent } from './register-student-additional-personal-information.component';

describe('RegisterStudentAdditionalPersonalInformationComponent', () => {
  let component: RegisterStudentAdditionalPersonalInformationComponent;
  let fixture: ComponentFixture<RegisterStudentAdditionalPersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterStudentAdditionalPersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStudentAdditionalPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
