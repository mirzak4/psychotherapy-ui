import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSnackbarComponent } from './status-snackbar.component';

describe('StatusSnackbarComponent', () => {
  let component: StatusSnackbarComponent;
  let fixture: ComponentFixture<StatusSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusSnackbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
