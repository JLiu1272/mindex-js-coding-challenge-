import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

export interface DialogData {
  animal: string,
  name: string,
}

@Component({
  selector: 'app-delete-direct-report-dialog',
  templateUrl: './delete-direct-report-dialog.component.html',
  styleUrls: ['./delete-direct-report-dialog.component.css']
})
export class DeleteDirectReportDialogComponent implements OnInit {
  employeeDetail: Employee;

  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }) {
  }


  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.employeeService.get(this.data.id).subscribe(employeeDetail => this.employeeDetail = employeeDetail)
  }
}
