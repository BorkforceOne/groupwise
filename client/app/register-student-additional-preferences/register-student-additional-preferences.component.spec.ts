/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegisterStudentAdditionalPreferencesComponent } from './register-student-additional-preferences.component';

describe('RegisterStudentAdditionalPreferencesComponent', () => {
  let component: RegisterStudentAdditionalPreferencesComponent;
  let fixture: ComponentFixture<RegisterStudentAdditionalPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterStudentAdditionalPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStudentAdditionalPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
