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

    it('#get(1)', () => {
        const employeeExpectedRes = {
            id: 1,
            firstName: 'Brian',
            lastName: 'McGee',
            position: 'CEO',
            directReports: [2, 3],
            compensation: 0,
        }

        let employeeRecRes: Employee;
        spyOn(employeeService, 'get').and.returnValue(of(employeeExpectedRes))

        employeeService.get(1).subscribe(emp => {
            employeeRecRes = emp;
        });

        expect(employeeRecRes).toEqual(employeeExpectedRes);
    })

    it('#getAll()', () => {
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

    it('#save() a new employee should create a new entry', async () => {

        // Initialise mock data 
        const employee: Employee = {
            id: 5,
            firstName: 'Jennifer',
            lastName: 'Liu',
            position: 'Software Engineer',
            directReports: [2, 3],
            compensation: 0
        }

        // Save a new employee
        let res: Employee;
        spyOn(employeeService, 'save').and.returnValue(of(employee))
        employeeService.save(employee).subscribe(emp => res = emp)
        expect(res).toEqual(employee)

        // Try to retrieve the new employee
        employeeService.get(5).subscribe(emp => expect(emp).toEqual(employee))
    })

    it('#save() saving an existing employee should update the employee', () => {
        // Generate Mock Data
        let employee: Employee = {
            id: 1,
            firstName: 'Brian',
            lastName: 'McGee',
            position: 'Vice President',
            directReports: [2, 3],
            compensation: 0
        }

        let updatedPosition: string;
        spyOn(employeeService, 'save').and.returnValue(of(employee))

        // Act
        employeeService.save(employee).subscribe(emp => {
            updatedPosition = emp.position;
        })

        // Assert 
        expect(updatedPosition).toEqual('Vice President');
    })
});