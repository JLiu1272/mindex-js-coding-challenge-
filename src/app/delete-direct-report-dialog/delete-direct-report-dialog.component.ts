import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-delete-direct-report-dialog',
  templateUrl: './delete-direct-report-dialog.component.html',
  styleUrls: ['./delete-direct-report-dialog.component.css']
})
export class DeleteDirectReportDialogComponent implements OnInit {
  confirmDeleteMsg: string = "ok";

  constructor(
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }) {
  }

  cancel(): void {
    this.dialogRef.close('cancel');
  }

  ngOnInit(): void {
  }
}
