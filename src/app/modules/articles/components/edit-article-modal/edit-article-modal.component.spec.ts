import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticleModalComponent } from './edit-article-modal.component';

describe('EditArticleModalComponent', () => {
  let component: EditArticleModalComponent;
  let fixture: ComponentFixture<EditArticleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditArticleModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
