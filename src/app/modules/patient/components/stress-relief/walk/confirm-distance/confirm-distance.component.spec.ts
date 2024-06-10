import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDistanceComponent } from './confirm-distance.component';

describe('ConfirmDistanceComponent', () => {
  let component: ConfirmDistanceComponent;
  let fixture: ComponentFixture<ConfirmDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDistanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
