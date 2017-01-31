/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegisterHostAdditionalPreferencesComponent } from './register-host-additional-preferences.component';

describe('RegisterHostAdditionalPreferencesComponent', () => {
  let component: RegisterHostAdditionalPreferencesComponent;
  let fixture: ComponentFixture<RegisterHostAdditionalPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterHostAdditionalPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterHostAdditionalPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
