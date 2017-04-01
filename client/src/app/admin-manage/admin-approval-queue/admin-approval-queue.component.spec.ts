import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApprovalQueueComponent } from './admin-approval-queue.component';

describe('AdminApprovalQueueComponent', () => {
  let component: AdminApprovalQueueComponent;
  let fixture: ComponentFixture<AdminApprovalQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApprovalQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApprovalQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
