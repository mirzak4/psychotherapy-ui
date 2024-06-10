import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreathControlComponent } from './breath-control.component';

describe('BreathControlComponent', () => {
  let component: BreathControlComponent;
  let fixture: ComponentFixture<BreathControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreathControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreathControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
