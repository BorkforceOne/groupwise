import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMatchActivityComponent } from './report-match-activity.component';

describe('ReportMatchActivityComponent', () => {
  let component: ReportMatchActivityComponent;
  let fixture: ComponentFixture<ReportMatchActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMatchActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMatchActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
