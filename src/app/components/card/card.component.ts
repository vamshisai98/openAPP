import { Component, OnInit } from '@angular/core';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards: string[];

  constructor(private cardService: CardService) {
    this.cards = [];
   }

  ngOnInit(): void {
    this.cards = this.cardService.getCardData();
  }

}
