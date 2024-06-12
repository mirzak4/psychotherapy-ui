import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologistSessionsComponent } from './psychologist-sessions.component';

describe('PsychologistSessionsComponent', () => {
  let component: PsychologistSessionsComponent;
  let fixture: ComponentFixture<PsychologistSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PsychologistSessionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PsychologistSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
