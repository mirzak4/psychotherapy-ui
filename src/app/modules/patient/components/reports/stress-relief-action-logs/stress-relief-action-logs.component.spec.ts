import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StressReliefActionLogsComponent } from './stress-relief-action-logs.component';

describe('StressReliefActionLogsComponent', () => {
  let component: StressReliefActionLogsComponent;
  let fixture: ComponentFixture<StressReliefActionLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StressReliefActionLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StressReliefActionLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
