import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsEditorComponent } from './lists-editor.component';

describe('ListsEditorComponent', () => {
  let component: ListsEditorComponent;
  let fixture: ComponentFixture<ListsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
