import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUsersTableComponent } from './report-users-table.component';

describe('ReportUsersTableComponent', () => {
  let component: ReportUsersTableComponent;
  let fixture: ComponentFixture<ReportUsersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUsersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
