import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUserTotalComponent } from './report-user-total.component';

describe('ReportUserTotalComponent', () => {
  let component: ReportUserTotalComponent;
  let fixture: ComponentFixture<ReportUserTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUserTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUserTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
