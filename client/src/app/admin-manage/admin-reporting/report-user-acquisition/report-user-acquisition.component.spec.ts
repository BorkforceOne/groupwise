import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUserAcquisitionComponent } from './report-user-acquisition.component';

describe('ReportUserAcquisitionComponent', () => {
  let component: ReportUserAcquisitionComponent;
  let fixture: ComponentFixture<ReportUserAcquisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUserAcquisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUserAcquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
