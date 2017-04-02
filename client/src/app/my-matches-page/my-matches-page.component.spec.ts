import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMatchesPageComponent } from './my-matches-page.component';

describe('MyMatchesPageComponent', () => {
  let component: MyMatchesPageComponent;
  let fixture: ComponentFixture<MyMatchesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMatchesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMatchesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
