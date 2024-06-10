import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-psychologist-select',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ScrollingModule,
    MatIconModule
  ],
  templateUrl: './psychologist-select.component.html',
  styleUrl: './psychologist-select.component.scss'
})
export class PsychologistSelectComponent {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  currentScrollIndex: number = 0;

  items = [1, 2, 3, 4, 5, 6, 7, 8];
  constructor() {}

  scrollToNext() {
    this.currentScrollIndex+= 3;
    if (this.currentScrollIndex >= this.items.length) {
      this.currentScrollIndex = this.items.length - 3;
    }
    this.viewport.scrollToIndex(this.currentScrollIndex, 'smooth');
  }

  scrollToPrevious() {
    this.currentScrollIndex -= 3;
    if (this.currentScrollIndex < 0) {
      this.currentScrollIndex = 0;
    }
    this.viewport.scrollToIndex(this.currentScrollIndex, 'smooth');
  }
}
