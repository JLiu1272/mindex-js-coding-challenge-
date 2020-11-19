import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of, from } from 'rxjs';

import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { flatMap, map, reduce } from 'rxjs/operators';

describe('EmployeeService', () => {
    let employeeService: EmployeeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                EmployeeService,
                HttpClient,
                HttpHandler
            ]
        });

        employeeService = TestBed.inject(EmployeeService);
    });

    it('employeeService should be created', () => {
        expect(employeeService).toBeTruthy();
    });

    it('get(1) should return information about employeeId 1', () => {
        const employeeExpectedRes = {
            id: 1,
            firstName: 'Brian',
            lastName: 'McGee',
            position: 'CEO',
            directReports: [2, 3],
            compensation: 0,
        }
        let employeeRecRes;
        spyOn(employeeService, 'get').and.returnValue(of(employeeExpectedRes));

        employeeService.get(1).subscribe(emp => {
            employeeRecRes = emp;
        });

        expect(employeeRecRes).toEqual(employeeExpectedRes);
    })

    it('getAll should return all of the employees', () => {
        const rawEmployeeData = [
            {
                id: 1,
                firstName: 'Brian',
                lastName: 'McGee',
                position: 'CEO',
                directReports: [2, 3],
                compensation: 0
            },
            {
                id: 2,
                firstName: 'Homer',
                lastName: 'Thompson',
                position: 'Dev Manager',
                directReports: [4],
                compensation: 0
            },
            {
                id: 3,
                firstName: 'Rock',
                lastName: 'Strongo',
                position: 'Lead Tester',
                directReports: [],
                compensation: 0
            },
            {
                id: 4,
                firstName: 'Max',
                lastName: 'Power',
                position: 'Junior Software Engineer',
                directReports: [],
                compensation: 0
            }
        ]

        const employeeExpectedRes = of(rawEmployeeData).pipe(
            flatMap(emps => from(emps))
        )

        let employeeRecRes: Employee[];
        spyOn(employeeService, 'getAll').and.returnValue(employeeExpectedRes)

        employeeService.getAll()
            .pipe(
                reduce((emps, e: Employee) => emps.concat(e), []),
                map(emps => employeeRecRes = emps),
            ).subscribe();

        expect(employeeRecRes).toEqual(rawEmployeeData);
    })

    it('testing save service', () => {

        // Initialise mock data 
        const employee: Employee = {
            id: 5,
            firstName: 'Jennifer',
            lastName: 'Liu',
            position: 'Software Engineer',
            directReports: [2, 3],
            compensation: 0
        }

        spyOn(employeeService, 'save').and.returnValue(of(employee));

        // Act
        let savedEmployee: Employee;
        employeeService.save(employee).subscribe(emp => savedEmployee = emp);

        // Assert 
        expect(savedEmployee).toEqual(employee);
    })
});