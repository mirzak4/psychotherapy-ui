import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StressReliefComponent } from './stress-relief.component';

describe('StressReliefComponent', () => {
  let component: StressReliefComponent;
  let fixture: ComponentFixture<StressReliefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StressReliefComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StressReliefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
