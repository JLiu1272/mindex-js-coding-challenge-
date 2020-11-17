import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { EditCompensationDialogComponent } from './edit-compensation-dialog.component';
import { EmployeeService } from '../employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('EditCompensationDialogComponent', () => {
  let component: EditCompensationDialogComponent;
  let fixture: ComponentFixture<EditCompensationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditCompensationDialogComponent
      ],
      providers: [
        EmployeeService,
        HttpClient,
        HttpHandler,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
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
