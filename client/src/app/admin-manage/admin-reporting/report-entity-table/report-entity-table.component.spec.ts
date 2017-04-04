import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEntityTableComponent } from './report-entity-table.component';

describe('ReportEntityTableComponent', () => {
  let component: ReportEntityTableComponent;
  let fixture: ComponentFixture<ReportEntityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEntityTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEntityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
