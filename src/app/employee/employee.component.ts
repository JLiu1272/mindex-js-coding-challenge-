import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.getEmployeeDetail()
  }

  getEmployeeDetail(): void {
    if (this.employee.directReports) {
      this.employee.directReports.forEach(
        id => this.employeeService.get(id).subscribe(employeeDetail => this.employeeDetails.push(employeeDetail))
      )
    }
  }

  delete(id: number): void {
    this.notify.emit({
      id: id,
      operation: "delete"
    })
    console.log("Delete employee");
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
