import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  constructor(private router: Router) {}

  openAllArticles() {
    this.router.navigate(['/articles']);
  }
}
