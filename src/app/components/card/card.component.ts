import { Component, OnInit } from '@angular/core';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards: string[];
  showCards: Boolean = false
  open: Boolean = false


  constructor(private cardService: CardService) {
    this.cards = [];
   }

  ngOnInit(): void {
    this.cards = this.cardService.getCardData();
  }

  playGame(){
    this.showCards = !this.showCards
  }
  openCard(){
    this.showCards = !this.showCards
  }

}
