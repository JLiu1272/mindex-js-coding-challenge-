import { async, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { EmployeeComponent } from './employee.component';
import { EmployeeService } from '../employee.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

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
  }));

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

  // Test #1 - getEmploymentDetails gets the desired result 
  it('getEmploymentDetails returns desired result', async(() => {

  }))
});
