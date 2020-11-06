import { Component, Input } from '@angular/core';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;

  constructor() {
  }

  totalDirectReports(directReports: Array<number>): number {
    return directReports
      ? directReports.reduce((accum, currVal) => accum + currVal)
      : 0
  }

}
