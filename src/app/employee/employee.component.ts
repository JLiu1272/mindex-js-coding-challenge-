import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDirectReportDialogComponent } from '../delete-direct-report-dialog/delete-direct-report-dialog.component';
import { EditCompensationDialogComponent } from '../edit-compensation-dialog/edit-compensation-dialog.component';

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

  delete(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteDirectReportDialogComponent, {
      width: '250px',
      data: { employee: employee }
    })

    dialogRef.afterClosed().subscribe(result => {
      // If the canceled the request, do not 
      // delete the employee that is being directly reported 
      if (result === "ok") {
        // Delete the employee from the direct report
        this.employeeDetails = this.employeeDetails.filter(emp => emp.id !== employee.id)

        // Notify employee-list that a delete operation is occuring 
        this.notify.emit({
          employee: employee,
          operation: "delete"
        })
      }
    })
  }

  edit(employee: Employee): void {
    const dialogRef = this.dialog.open(EditCompensationDialogComponent, {
      width: '300px',
      data: { employee: employee }
    })

    dialogRef.afterClosed().subscribe(result => {
      // Want to perform editing if the user did not 
      // cancel the operation
      // When a user clicks on a backdrop, the request is considered 
      // to be cancelled. 
      if (result && result !== "cancel") {
        this.notify.emit({
          employee: result,
          operation: "edit"
        })
      }
    })
  }

  totalDirectReports(directReports: Array<number>): number {
    return directReports
      ? directReports.reduce((accum, currVal) => accum + currVal)
      : 0
  }
}
