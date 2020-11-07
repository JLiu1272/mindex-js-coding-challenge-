import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDirectReportDialogComponent } from './delete-direct-report-dialog.component';

describe('DeleteDirectReportDialogComponent', () => {
  let component: DeleteDirectReportDialogComponent;
  let fixture: ComponentFixture<DeleteDirectReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDirectReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDirectReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
