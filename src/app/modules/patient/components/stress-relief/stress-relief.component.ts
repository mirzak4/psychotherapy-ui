import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-stress-relief',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  animations: [
    trigger('zoomInOut', [
      state('hover', style({
        transform: 'scale(1.2)'
      })),
      state('default', style({
        transform: 'scale(1)'
      })),
      transition('default <=> hover', animate('300ms ease-in-out'))
    ])
  ],
  templateUrl: './stress-relief.component.html',
  styleUrl: './stress-relief.component.scss'
})
export class StressReliefComponent {
  actionZoomStates = {
    meditation: 'default',
    breath: 'default',
    walking: 'default'
  };

  constructor(private _router: Router, private _route: ActivatedRoute) {}

  onMouseEnter(key: string) {
    this.actionZoomStates[key] = 'hover';
  }

  onMouseLeave(key: string) {
    this.actionZoomStates[key] = 'default';
  }
}
