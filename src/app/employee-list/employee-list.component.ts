import { Component, OnInit } from '@angular/core';
import { catchError, map, reduce } from 'rxjs/operators';

import { Employee } from '../employee';
import { Message } from '../message';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string;
  message: Message = { employee: null, operation: "delete" };

  constructor(private employeeService: EmployeeService) {
  }

  onNotifyClicked(message: Message): void {
    var { employee, operation } = message
    if (operation === "delete") {
      this.deleteEmployee(employee);
    }
  }

  deleteEmployee(employee: Employee): void {
    this.employees = this.employees.filter(emp => emp.id !== employee.id)
    this.employeeService.remove(employee)
  }

  editEmployee(emp: Employee): void {
  }

  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
