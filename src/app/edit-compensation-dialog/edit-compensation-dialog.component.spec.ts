import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompensationDialogComponent } from './edit-compensation-dialog.component';

describe('EditCompensationDialogComponent', () => {
  let component: EditCompensationDialogComponent;
  let fixture: ComponentFixture<EditCompensationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompensationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompensationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
