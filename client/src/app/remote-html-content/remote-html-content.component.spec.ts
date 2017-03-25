/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RemoteHtmlContentComponent } from './remote-html-content.component';

describe('RemoteHtmlContentComponent', () => {
  let component: RemoteHtmlContentComponent;
  let fixture: ComponentFixture<RemoteHtmlContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteHtmlContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteHtmlContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
