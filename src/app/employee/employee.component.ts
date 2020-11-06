import { Component, Input } from '@angular/core';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;
  employeeDetails: Employee[] = [];

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

  totalDirectReports(directReports: Array<number>): number {
    return directReports
      ? directReports.reduce((accum, currVal) => accum + currVal)
      : 0
  }
}
