import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologistSelectComponent } from './psychologist-select.component';

describe('PsychologistSelectComponent', () => {
  let component: PsychologistSelectComponent;
  let fixture: ComponentFixture<PsychologistSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PsychologistSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PsychologistSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
