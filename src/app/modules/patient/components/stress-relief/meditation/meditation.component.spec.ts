import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeditationComponent } from './meditation.component';

describe('MeditationComponent', () => {
  let component: MeditationComponent;
  let fixture: ComponentFixture<MeditationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeditationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
