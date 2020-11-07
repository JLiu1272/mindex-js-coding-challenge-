import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDirectReportDialogComponent } from '../delete-direct-report-dialog/delete-direct-report-dialog.component';

import { Employee } from '../employee';
import { Message } from '../message';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;
  employeeDetails: Employee[] = [];
  employeeDetail: Employee;
  @Output() notify: EventEmitter<Message> = new EventEmitter<Message>();

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getEmployeeDetails()
  }

  getEmployeeDetails(): void {
    if (this.employee.directReports) {
      this.employee.directReports.forEach(
        id => this.employeeService.get(id).subscribe(employeeDetail => this.employeeDetails.push(employeeDetail))
      )
    }
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(DeleteDirectReportDialogComponent, {
      width: '250px',
      data: { id: id }
    })

    dialogRef.afterClosed().subscribe(result => {
      // Delete the employee from the direct report
      this.employeeDetails = this.employeeDetails.filter(emp => emp.id !== id)

      // Notify employee-list that a delete operation is occuring 
      this.notify.emit({
        id: id,
        operation: "delete"
      })
    })
  }

  edit(id: number): void {
    this.notify.emit({
      id: id,
      operation: "edit"
    })
    console.log("Edit employee");
  }

  totalDirectReports(directReports: Array<number>): number {
    return directReports
      ? directReports.reduce((accum, currVal) => accum + currVal)
      : 0
  }
}
