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
  message: Message = { id: 0, operation: "delete" };

  constructor(private employeeService: EmployeeService) {
  }

  onNotifyClicked(message: Message): void {
    var { id, operation } = message
    if (operation === "delete") {
      this.deleteEmployee(id)
    }
  }

  /**
   * Deletes this employee from employees list 
   * @param id 
   */
  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id)
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
