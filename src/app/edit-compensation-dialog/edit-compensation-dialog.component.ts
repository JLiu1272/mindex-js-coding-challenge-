import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-compensation-dialog',
  templateUrl: './edit-compensation-dialog.component.html',
  styleUrls: ['./edit-compensation-dialog.component.css']
})
export class EditCompensationDialogComponent implements OnInit {
  employeeDetail: Employee;

  constructor(
    public employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) { }

  cancel(): void {
    this.dialogRef.close('cancel');
  }

  ngOnInit(): void {
    this.employeeService.get(this.data.id).subscribe(employeeDetail => this.employeeDetail = employeeDetail)
  }

}
