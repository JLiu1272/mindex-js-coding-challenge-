import { async, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EmployeeComponent } from './employee.component';
import { EmployeeService } from '../employee.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { Employee } from '../employee';

@Component({ selector: 'app-mat-card', template: '' })
class CardComponent {
}

@Component({ selector: 'app-mat-card-header', template: '' })
class CardHeaderComponent {
}

@Component({ selector: 'app-mat-card-title', template: '' })
class CardTitleComponent {
}

@Component({ selector: 'app-mat-card-subtitle', template: '' })
class CardSubtitleComponent {
}

@Component({ selector: 'app-mat-card-content', template: '' })
class CardContentComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);

describe('EmployeeComponent', () => {
  let employeeService: EmployeeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeComponent,
      ],
      imports: [
        MatDialogModule
      ],
      // provide the component-under-test and dependent service
      providers: [
        EmployeeService,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();

    employeeService = TestBed.inject(EmployeeService)
  }));

  it('employeeService should be created', () => {
    expect(employeeService).toBeTruthy();
  })

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const comp = fixture.debugElement.componentInstance;
    comp.employee = {
      id: 1,
      firstName: 'first',
      lastName: 'last',
      position: 'jobTitle'
    };

    expect(comp).toBeTruthy();
  }));


  // Testing services
  // it('#get should return value from employeeService', () => {
  //   const employeeStub = {
  //     id: 1,
  //     firstName: 'Brian',
  //     lastName: 'McGee',
  //     position: 'CEO',
  //     directReports: [2, 3],
  //     compensation: 0,
  //   }

});
