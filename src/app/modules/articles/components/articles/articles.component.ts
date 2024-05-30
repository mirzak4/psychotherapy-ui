import { Component, OnInit } from '@angular/core';
import { Article } from '../../../../viewmodels/classes';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { Image, Text, Video } from '../../../../viewmodels/classes';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ArticleModalComponent } from '../article-modal/article-modal.component';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    CommonModule,
    ArticleCardComponent,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [
    {
      id: '1',
      title: 'Mental toughness and resilience',
      author: 'Joe',
      text: new Text({
        content:
          'We tend to think of toughness in the physical sense — our ability to complete a hike in cold weather or work long hours without breaks. But toughness can apply to what the mind is capable of, too. With a strong, resilient mind, we can better manage our thoughts, emotions, and energy when we’re faced with stress or challenging situations. And ultimately, we gain the ability to remain cool, calm, and collected no matter what we’re up against. Why would anyone not want this kind of mental strength?\n\nWhile resilience doesn’t happen overnight, mindfulness— specifically meditation — can help us cultivate mental toughness. But like any habit, it takes time and practice. As Headspace co-founder and former Buddhist monk Andy Puddicombe notes: “As they say, ‘If it was easy, they’d all be doing it.’ Nothing could be truer than that when it comes to meditation: it requires patience to sit with the mind on a regular basis and be present with whatever arises.”\n\nWith practice, we learn to sit through any discomfort that dificult thoughts and feelings can create … and let them go. It’s from this space we created to be kind to ourselves that we can build mental toughness and resilience.\n\nWhat is resilience?\n\nResilience is our ability to adapt well when faced with significant stressors or difficult events, including health, relationship, or workplace problems. When we’re resilient, we can “bounce back” from challenging events more quickly. Instead of letting them dictate how we feel, we’re able to keep our cool. Feeling confident about what needs to happen next.\n\nMeditation can increase resiliency, making it easier to recover more quickly when anger or strong emotions arise. Even if we wish it could, mindfulness won’t stop our worries and troubles from sneaking up on us — life is full of ups and downs. But it can change our relationship with them.\n\nMeditation helps to strengthen the mind the same way exercise strengthens the body. As Andy says: “We are taking time out to train he mind; we are fundamentally shifting the way we relate to our thoughts and feelings. At first, that can sound a little overwhelming. But the benefits are experienced by repeating this exercise a little or often, slowly but surely, and building a stable sense of awareness that starts to filter through to the rest of our life. The more frequently we practice being aware, the more beneficial meditation becomes.”\n\nSimilarly, micromanaging bosses and aggressive drivers in our life don’t go away, but a consistent meditation practice helps us to more effectively relieve stress that these encounters can cause.\n\n',
      }),
      video: new Video({
        videoUrl: '',
      }),
      image: new Image({
        imageUrl:
          'https://images.ctfassets.net/v3n26e09qg2r/38m0WMXPCf5GENI20eASQr/f05d66ef52efca6857cc6a7c71c92bef/HS-Evergreen-Brand-Group-sb__1_.svg?fm=&w=1920&q=75',
      }),
    },
    {
      id: '2',
      title: 'What is mindfulness?',
      author: 'Jane',
      text: new Text({
        content:
          'We tend to think of toughness in the physical sense — our ability to complete a hike in cold weather or work long hours without breaks. But toughness can apply to what the mind is capable of, too. With a strong, resilient mind, we can better manage our thoughts, emotions, and energy when we’re faced with stress or challenging situations. And ultimately, we gain the ability to remain cool, calm, and collected no matter what we are up against. Why would anyone not want this kind of mental strength?\n\nWhile resilience doesn’t happen overnight, mindfulness— specifically meditation — can help us cultivate mental toughness. But like any habit, it takes time and practice. As Headspace co-founder and former Buddhist monk Andy Puddicombe notes: “As they say, ‘If it was easy, they’d all be doing it.’ Nothing could be truer than that when it comes to meditation: it requires patience to sit with the mind on a regular basis and be present with whatever arises.”\n\nWith practice, we learn to sit through any discomfort that difficult thoughts and feelings can create and let them go. It’s from this space we created to be kind to ourselves that we can build mental toughness and resilience.',
      }),
      video: new Video({
        videoUrl: '',
      }),
      image: new Image({
        imageUrl:
          'https://images.ctfassets.net/v3n26e09qg2r/390caUf01pxYy7J7CRzgKo/e45b57773963540827259a83f788cd79/HS-Evergreen-Brand-Smile-04-rc__1_.svg?fm=&w=1920&q=75',
      }),
    },
    {
      id: '3',
      title: 'Mental health & well-being',
      author: 'Anida',
      text: new Text({
        content: 'Samo video...',
      }),
      video: new Video({
        videoUrl: 'https://www.youtube.com/watch?v=sG7DBA-mgFY',
      }),
      image: new Image({
        imageUrl:
          'https://images.ctfassets.net/v3n26e09qg2r/W6PPYSsTjuXk4szleMMGv/d6466c9d357e0af97b1c264e065ad8c9/HS-Evergreen-Brand-Sun_Blue_Sky-rc__1_.svg?fm=&w=1920&q=75',
      }),
    },
  ];

  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {
    // Nema potrebe za dohvaćanjem članaka iz servisa jer su podaci statični
  }

  openNewArticleModal() {
    this._dialog.open(ArticleModalComponent, {
      panelClass: 'article-modal-container',
    });
  }
}
