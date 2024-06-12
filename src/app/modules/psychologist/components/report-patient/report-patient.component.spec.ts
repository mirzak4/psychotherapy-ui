import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPatientComponent } from './report-patient.component';

describe('ReportPatientComponent', () => {
  let component: ReportPatientComponent;
  let fixture: ComponentFixture<ReportPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
